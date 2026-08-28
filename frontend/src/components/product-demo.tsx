"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { flushSync } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  CalendarBlank,
  ChartLineUp,
  Check,
  CheckCircle,
  ChatCircleDots,
  DotsSixVertical,
  FileAudio,
  FileArrowUp,
  FileText,
  Headphones,
  IdentificationCard,
  ImageSquare,
  MusicNotes,
  PaperPlaneTilt,
  PencilSimple,
  Plus,
  Sparkle,
  SquaresFour,
  TextAa,
  UploadSimple,
  UsersThree,
  VideoCamera,
  Wallet,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";

import styles from "./product-demo.module.css";

gsap.registerPlugin(useGSAP, Flip);

type Workspace = "label" | "artist";
type ReportState = "idle" | "processing" | "ready";
type DashboardPeriod = "day" | "week" | "month" | "year";
type ReleaseDemoStep = "list" | "choose" | "audio" | "track" | "release" | "promo" | "lyrics" | "album-general" | "album-tracks" | "album-track" | "complete";
type ChatSender = "label" | "artist";

type DemoMessage = {
  id: number;
  sender: ChatSender;
  text: string;
  time: string;
};

type DemoNavigationItem = {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
};

const navigation: Record<Workspace, DemoNavigationItem[]> = {
  label: [
    { id: "overview", label: "Обзор", icon: SquaresFour },
    { id: "releases", label: "Релизы", icon: MusicNotes },
    { id: "reports", label: "Отчётность", icon: ChartLineUp },
    { id: "artists", label: "Артисты", icon: UsersThree },
    { id: "chat", label: "Чаты с артистами", icon: ChatCircleDots },
  ],
  artist: [
    { id: "new-release", label: "Новый релиз", icon: Plus },
    { id: "home", label: "Главная", icon: SquaresFour },
    { id: "releases", label: "Релизы", icon: Headphones },
    { id: "documents", label: "Документы", icon: FileText },
    { id: "balance", label: "Баланс", icon: Wallet },
    { id: "chat", label: "Чат с лейблом", icon: ChatCircleDots },
  ],
};

const releaseRows = [
  { title: "Самый лучший трек в мире", artist: "KONSTANTINOV", status: "На проверке", tone: "attention" },
  { title: "Хит на сто процентов", artist: "STAVKU", status: "Принят", tone: "success" },
  { title: "Самый лучший день", artist: "Мира Ли", status: "Черновик", tone: "neutral" },
];

const artistRows = [
  { id: "stavku", name: "STAVKU", email: "stavku@example.com", telegram: "@stavku", phone: "+7 ••• •••-••-17", releases: "14 релизов", balance: "18 420 ₽", split: "70 / 30", contract: "№ LC-017, действует", documents: "4 файла", requisites: "Проверены" },
  { id: "konstantinov", name: "KONSTANTINOV", email: "artist@example.com", telegram: "@artist_demo", phone: "+7 ••• •••-••-42", releases: "8 релизов", balance: "12 870 ₽", split: "75 / 25", contract: "№ LC-024, действует", documents: "6 файлов", requisites: "Проверены" },
  { id: "mira", name: "Мира Ли", email: "mira@example.com", telegram: "@mira_demo", phone: "+7 ••• •••-••-08", releases: "3 релиза", balance: "7 340 ₽", split: "70 / 30", contract: "№ LC-031, действует", documents: "3 файла", requisites: "Заполнены" },
];

const artistReleaseRows = [
  { title: "Самый лучший трек в мире", detail: "Сингл, 1 трек", status: "Черновик", tone: "neutral" },
  { title: "Хит на сто процентов", detail: "EP, 4 трека", status: "На проверке", tone: "attention" },
  { title: "Самый лучший день", detail: "Сингл, 1 трек", status: "Доставлен", tone: "success" },
];

const releaseDemoSteps = [
  { id: "audio", label: "WAV", icon: FileAudio },
  { id: "track", label: "Трек", icon: MusicNotes },
  { id: "release", label: "Релиз", icon: ImageSquare },
  { id: "promo", label: "Промо", icon: ChartLineUp },
  { id: "lyrics", label: "Текст", icon: TextAa },
] as const;

const dashboardSeries: Record<DashboardPeriod, number[]> = {
  day: [12, 58, 31, 84, 22, 67, 45],
  week: [240, 510, 320, 780, 450, 690, 380],
  month: [420, 860, 530, 1120, 740, 1380, 910, 1260, 680, 1490, 1040, 1320],
  year: [6200, 9400, 7100, 12800, 8900, 15100, 10400, 13900, 8300, 16200, 11800, 14600],
};

const artistGrowth = [3840, 4960, 6120, 7480, 8930, 10340, 11620, 12840];

const dashboardPeriodLabels: Record<DashboardPeriod, string> = {
  day: "День",
  week: "Неделя",
  month: "30 дней",
  year: "Год",
};

function Status({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`${styles.status} ${styles[tone]}`}>{children}</span>;
}

function LabelOverview() {
  const [period, setPeriod] = useState<DashboardPeriod>("month");
  const values = dashboardSeries[period];
  const maxValue = Math.max(...values);

  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}>
        <div><h4>Добро пожаловать</h4><p>Сводка по работе лейбла</p></div>
        <span className={styles.demoData}>Демонстрационные данные</span>
      </div>
      <div className={styles.attentionGrid}>
        <article><FileText size={20} weight="light" /><span>Договоры</span><strong>7</strong><small>требуют проверки</small></article>
        <article><MusicNotes size={20} weight="light" /><span>Релизы</span><strong>4</strong><small>ожидают решения</small></article>
        <article><Bank size={20} weight="light" /><span>Выплаты</span><strong>2</strong><small>заявки на вывод</small></article>
      </div>
      <div className={styles.dashboardSummary} aria-label="Статистика лейбла">
        <div><span>Всего релизов</span><strong>48 620</strong><small>(+9 120 за месяц)</small></div>
        <div><span>Всего артистов</span><strong>12 840</strong><small>(+2 460 за месяц)</small></div>
        <div><span>Договоров</span><strong>13 970</strong><small>(+2 730 за месяц)</small></div>
      </div>
      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsCard}>
          <div className={styles.analyticsHeading}>
            <div><span>За выбранный период</span><h5>Отправленные релизы</h5></div>
            <strong>{values.reduce((sum, value) => sum + value, 0).toLocaleString("ru-RU")}</strong>
          </div>
          <div className={styles.analyticsPeriods} role="group" aria-label="Период графика релизов">
            {(Object.keys(dashboardPeriodLabels) as DashboardPeriod[]).map((item) => (
              <button type="button" className={period === item ? styles.analyticsPeriodActive : undefined} onClick={() => setPeriod(item)} key={item}>
                {dashboardPeriodLabels[item]}
              </button>
            ))}
          </div>
          <div className={styles.chart} role="img" aria-label={`Количество отправленных релизов по отдельным отрезкам за период: ${dashboardPeriodLabels[period]}`}>
            {values.map((value, index) => (
              <span key={`${period}-${index}`} style={{ height: `${Math.max(12, (value / maxValue) * 100)}%` }} title={`${value} релизов`} />
            ))}
          </div>
        </div>
        <div className={styles.analyticsCard}>
          <div className={styles.analyticsHeading}>
            <div><span>Накопительный итог</span><h5>Количество артистов</h5></div>
            <strong>12 840</strong>
          </div>
          <p className={styles.chartNote}>База растёт вместе с лейблом и не обнуляется между периодами.</p>
          <div className={`${styles.chart} ${styles.growthChart}`} role="img" aria-label="Накопительный график количества артистов">
            {artistGrowth.map((value) => (
              <span key={value} style={{ height: `${(value / artistGrowth.at(-1)!) * 100}%` }} title={`${value.toLocaleString("ru-RU")} артистов`} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.activityBlock}>
        <div className={styles.blockHeading}><h5>Последние релизы</h5><button type="button">Открыть все <ArrowRight size={15} /></button></div>
        {releaseRows.slice(0, 2).map((release) => (
          <div className={styles.compactRow} key={release.title}>
            <div className={styles.coverPlaceholder}><MusicNotes size={18} weight="light" /></div>
            <div><strong>{release.title}</strong><span>{release.artist}</span></div>
            <Status tone={release.tone}>{release.status}</Status>
          </div>
        ))}
      </div>
    </div>
  );
}

function LabelCustomFeature() {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}>
        <div><h4>Ваш процесс внутри платформы</h4><p>LabelCloud подстраивается под правила конкретного лейбла</p></div>
        <span className={styles.demoData}>Персональная разработка</span>
      </div>
      <div className={styles.customFeaturePanel}>
        <Sparkle size={34} weight="light" />
        <h5>Реализуем нужный вам функционал</h5>
        <p>Опишите особый процесс, правило или рабочий сценарий. Мы встроим его в систему персонально под ваш лейбл.</p>
        <a href="#contact">Обсудить свой сценарий <ArrowRight size={16} /></a>
      </div>
    </div>
  );
}

function LabelReleases() {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}>
        <div><h4>Релизы</h4><p>Материалы артистов и этапы проверки</p></div>
        <button className={styles.actionButton} type="button"><PaperPlaneTilt size={17} /> Экспорт</button>
      </div>
      <div className={styles.filterRow} aria-label="Фильтры релизов"><button className={styles.filterActive} type="button">Все</button><button type="button">На проверке</button><button type="button">Принятые</button></div>
      <div className={styles.dataList}>
        {releaseRows.map((release) => (
          <div className={styles.releaseRow} key={release.title}>
            <div className={styles.coverPlaceholder}><MusicNotes size={18} weight="light" /></div>
            <div><strong>{release.title}</strong><span>{release.artist}</span></div>
            <Status tone={release.tone}>{release.status}</Status>
            <button className={styles.rowAction} type="button">Открыть</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LabelReports({ reportState, onUpload }: { reportState: ReportState; onUpload: () => void }) {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}>
        <div><h4>Отчётность</h4><p>Импорт и распределение роялти</p></div>
        <span className={styles.demoData}>Демо XLSX</span>
      </div>
      <div className={styles.reportLayout}>
        <div className={styles.uploadPanel}>
          <FileArrowUp size={30} weight="light" />
          <h5>{reportState === "ready" ? "Отчёт обработан" : reportState === "processing" ? "Обрабатываем файл" : "Загрузите отчёт дистрибьютора"}</h5>
          <p>{reportState === "ready" ? "Начисления подготовлены и появились в кабинетах артистов." : "Система разберёт строки и сопоставит их с артистами и релизами."}</p>
          <button type="button" onClick={onUpload} disabled={reportState === "processing"}>
            {reportState === "ready" ? <><Check size={18} /> Обработано</> : reportState === "processing" ? "Распределяем начисления..." : "Выбрать XLSX"}
          </button>
        </div>
        <div className={styles.explanationPanel}>
          <h5>Что произойдёт автоматически</h5>
          <ol>
            <li><span>1</span><div><strong>Система прочитает строки</strong><p>Продажи, площадки, территории и суммы попадут в единый отчёт.</p></div></li>
            <li><span>2</span><div><strong>Сопоставит каталог</strong><p>ISRC и названия свяжут начисления с нужными артистами и релизами.</p></div></li>
            <li><span>3</span><div><strong>Обновит кабинеты</strong><p>Каждый артист увидит только свою часть отчёта и новый баланс.</p></div></li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function LabelArtists() {
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const selectedArtist = artistRows.find((artist) => artist.id === selectedArtistId);

  if (selectedArtist) {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setSelectedArtistId(null)} aria-label="Вернуться к списку артистов"><ArrowLeft size={18} /></button>
          <div><h4>{selectedArtist.name}</h4><p>Карточка артиста</p></div>
          <span className={styles.demoData}>Демонстрационные данные</span>
        </div>
        <div className={styles.artistProfileHero}>
          <div className={styles.artistProfileAvatar}>{selectedArtist.name.slice(0, 1)}</div>
          <div><span>Сценическое имя</span><h5>{selectedArtist.name}</h5><a href={`mailto:${selectedArtist.email}`}>{selectedArtist.email}</a></div>
          <div className={styles.artistSplit}><span>Ставка</span><strong>{selectedArtist.split}</strong><small>артист / лейбл</small></div>
        </div>
        <div className={styles.artistDetailsGrid} aria-label={`Данные артиста ${selectedArtist.name}`}>
          <div><span>ФИО</span><strong>Скрыто в демо</strong></div>
          <div><span>Телефон</span><strong>{selectedArtist.phone}</strong></div>
          <div><span>Telegram</span><strong>{selectedArtist.telegram}</strong></div>
          <div><span>Договор</span><strong>{selectedArtist.contract}</strong></div>
          <div><span>Документы</span><strong>{selectedArtist.documents}</strong></div>
          <div><span>Реквизиты</span><strong>{selectedArtist.requisites}</strong></div>
        </div>
        <p className={styles.artistProfileNote}>Состав полей, документы и обязательность заполнения настраиваются под правила вашего лейбла.</p>
      </div>
    );
  }

  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Артисты</h4><p>Данные, документы и финансовая история</p></div><button className={styles.actionButton} type="button">Добавить артиста</button></div>
      <div className={styles.dataList}>
        {artistRows.map((artist) => (
          <button type="button" className={`${styles.artistRow} ${styles.artistRowButton}`} onClick={() => setSelectedArtistId(artist.id)} key={artist.name}>
            <div className={styles.avatar}>{artist.name.slice(0, 1)}</div>
            <div><strong>{artist.name}</strong><span>{artist.email}</span><small>{artist.releases}</small></div>
            <div className={styles.artistRate}><span>Ставка</span><strong>{artist.split}</strong></div>
            <div className={styles.balanceValue}><span>Баланс</span><strong>{artist.balance}</strong></div>
            <span className={styles.rowAction}>Открыть</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ArtistHome({ onNewRelease, onEditRelease, onChat }: { onNewRelease: () => void; onEditRelease: () => void; onChat: () => void }) {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Привет, KONSTANTINOV</h4><p>Всё важное по вашему кабинету</p></div><span className={styles.demoData}>Демо артиста</span></div>
      <div className={styles.artistQuickActions} aria-label="Быстрые действия">
        <button type="button" onClick={onNewRelease}><Plus size={19} /><span><strong>Новый релиз</strong><small>Сингл или альбом</small></span></button>
        <button type="button" onClick={onEditRelease}><PencilSimple size={19} /><span><strong>Редактировать релиз</strong><small>Продолжить черновик</small></span></button>
        <button type="button" onClick={onChat}><ChatCircleDots size={19} /><span><strong>Чат с лейблом</strong><small>Задать вопрос команде</small></span></button>
      </div>
      <div className={styles.artistSummary}>
        <article><span>Доступный баланс</span><strong>7 340 ₽</strong><button type="button">Запросить выплату</button></article>
        <article><span>Релизы</span><strong>3</strong><small>1 релиз на проверке</small></article>
      </div>
      <div className={styles.artistNextStep}>
        <div className={styles.coverPlaceholder}><Headphones size={20} weight="light" /></div>
        <div><span>Продолжить работу</span><strong>Самый лучший трек в мире</strong><small>Черновик сохранён, заполнено 6 из 9 разделов</small></div>
        <button type="button" onClick={onEditRelease}>Открыть</button>
      </div>
    </div>
  );
}

const initialAlbumTracks = [
  { id: 1, title: "Тот самый интро", file: "01_tot_samyi_intro.wav", duration: "01:18" },
  { id: 2, title: "Хит на сто процентов", file: "02_hit_sto_procentov.wav", duration: "03:24" },
  { id: 3, title: "Ещё один хит", file: "03_eshe_odin_hit.wav", duration: "02:57" },
];

function ArtistReleases({ initialMode = "list" }: { initialMode?: "list" | "new" | "edit" }) {
  const albumTrackListRef = useRef<HTMLDivElement>(null);
  const pointerDragRef = useRef<{ trackId: number; pointerId: number } | null>(null);
  const [flowStep, setFlowStep] = useState<ReleaseDemoStep>(initialMode === "new" ? "choose" : initialMode === "edit" ? "track" : "list");
  const [audioSelected, setAudioSelected] = useState(initialMode === "edit");
  const [promoRequested, setPromoRequested] = useState(false);
  const [coverSelected, setCoverSelected] = useState(initialMode === "edit");
  const [videoSelected, setVideoSelected] = useState(false);
  const [documentSelected, setDocumentSelected] = useState(false);
  const [albumCoverSelected, setAlbumCoverSelected] = useState(false);
  const [albumTracks, setAlbumTracks] = useState(initialAlbumTracks);
  const albumTracksRef = useRef(albumTracks);
  const [draggedTrackId, setDraggedTrackId] = useState<number | null>(null);
  const [reorderAnnouncement, setReorderAnnouncement] = useState("");
  const [albumTrackSelected, setAlbumTrackSelected] = useState(false);
  const { context: flipContext } = useGSAP({ scope: albumTrackListRef });

  useEffect(() => {
    albumTracksRef.current = albumTracks;
  }, [albumTracks]);

  const currentStepIndex = releaseDemoSteps.findIndex((step) => step.id === flowStep);

  function startRelease() {
    setAudioSelected(false);
    setPromoRequested(false);
    setCoverSelected(false);
    setVideoSelected(false);
    setDocumentSelected(false);
    setFlowStep("choose");
  }

  function startSingle() {
    setAudioSelected(false);
    setCoverSelected(false);
    setFlowStep("audio");
  }

  function startAlbum() {
    setAlbumCoverSelected(false);
    setAlbumTracks(initialAlbumTracks);
    setFlowStep("album-general");
  }

  const previewTrackPosition = useCallback((sourceId: number, targetId: number) => {
    if (sourceId === targetId || !albumTrackListRef.current) return;
    const from = albumTracks.findIndex((track) => track.id === sourceId);
    const to = albumTracks.findIndex((track) => track.id === targetId);
    if (from < 0 || to < 0) return;

    const rows = Array.from(albumTrackListRef.current.querySelectorAll<HTMLElement>("[data-track-id]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = reduceMotion ? null : Flip.getState(rows, { simple: true });
    flushSync(() => {
      setAlbumTracks((tracks) => {
        const next = [...tracks];
        const currentFrom = next.findIndex((track) => track.id === sourceId);
        const currentTo = next.findIndex((track) => track.id === targetId);
        const [track] = next.splice(currentFrom, 1);
        next.splice(currentTo, 0, track);
        return next;
      });
    });
    if (state) flipContext.add(() => Flip.from(state, { duration: 0.32, ease: "power2.out", simple: true, absolute: false }));
  }, [albumTracks, flipContext]);

  function moveTrackWithKeyboard(id: number, direction: -1 | 1) {
    const index = albumTracks.findIndex((track) => track.id === id);
    const target = albumTracks[index + direction];
    if (!target) return;
    previewTrackPosition(id, target.id);
    const track = albumTracks[index];
    setReorderAnnouncement(`${track.title}: позиция ${index + direction + 1} из ${albumTracks.length}`);
  }

  function beginPointerReorder(event: React.PointerEvent<HTMLButtonElement>, trackId: number) {
    if (event.button !== 0) return;
    event.preventDefault();
    pointerDragRef.current = { trackId, pointerId: event.pointerId };
    setDraggedTrackId(trackId);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function updatePointerReorder(event: React.PointerEvent<HTMLButtonElement>) {
    const active = pointerDragRef.current;
    if (!active || active.pointerId !== event.pointerId) return;
    event.preventDefault();
    const targetRow = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-track-id]") as HTMLElement | null;
    const targetId = Number(targetRow?.dataset.trackId);
    if (targetId) previewTrackPosition(active.trackId, targetId);
  }

  function finishPointerReorder(event: React.PointerEvent<HTMLButtonElement>) {
    const active = pointerDragRef.current;
    if (!active || active.pointerId !== event.pointerId) return;
    const tracks = albumTracksRef.current;
    const index = tracks.findIndex((track) => track.id === active.trackId);
    const track = tracks[index];
    if (track) setReorderAnnouncement(`${track.title}: позиция ${index + 1} из ${tracks.length}`);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointerDragRef.current = null;
    setDraggedTrackId(null);
  }

  function goBack() {
    if (currentStepIndex <= 0) {
      setFlowStep("list");
      return;
    }
    setFlowStep(releaseDemoSteps[currentStepIndex - 1].id);
  }

  function goNext() {
    if (currentStepIndex === releaseDemoSteps.length - 1) {
      setFlowStep("complete");
      return;
    }
    setFlowStep(releaseDemoSteps[currentStepIndex + 1].id);
  }

  if (flowStep === "complete") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseComplete}>
          <CheckCircle size={42} weight="light" />
          <h4>Релиз отправлен на модерацию</h4>
          <p>Команда лейбла увидит материалы в своём кабинете и сможет продолжить работу с релизом.</p>
          <button type="button" onClick={() => setFlowStep("list")}>Вернуться к релизам</button>
        </div>
      </div>
    );
  }

  if (flowStep === "choose") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setFlowStep("list")} aria-label="Вернуться к релизам"><ArrowLeft size={18} /></button>
          <div><h4>Новый релиз</h4><p>Выберите формат, который хотите отправить</p></div>
          <span className={styles.demoData}>Первый шаг</span>
        </div>
        <div className={styles.releaseTypeGrid}>
          <button type="button" onClick={startSingle}><FileAudio size={30} weight="light" /><span><strong>Сингл</strong><small>Один трек</small></span><ArrowRight size={18} /></button>
          <button type="button" onClick={startAlbum}><MusicNotes size={30} weight="light" /><span><strong>Альбом / EP</strong><small>Несколько треков</small></span><ArrowRight size={18} /></button>
        </div>
      </div>
    );
  }

  if (flowStep === "album-general") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setFlowStep("choose")} aria-label="Назад к выбору типа"><ArrowLeft size={18} /></button>
          <div><h4>Новый альбом</h4><p>Основные данные релиза</p></div>
          <span className={styles.demoData}>Этап 1 из 2</span>
        </div>
        <div className={styles.releaseStepPanel}>
          <div className={styles.releaseStepCopy}><h5>Самый лучший альбом в мире</h5><p>Заполните общую информацию. Треки добавим на следующем этапе.</p></div>
          <div className={styles.demoFormGrid}>
            <label><span>Название альбома</span><input defaultValue="Самый лучший альбом в мире" /></label>
            <label><span>Исполнитель</span><input defaultValue="KONSTANTINOV" /></label>
            <label><span>Жанр</span><select defaultValue="hip-hop"><option value="hip-hop">Hip-hop</option><option value="pop">Pop</option></select></label>
            <label><span>Дата релиза</span><input type="date" defaultValue="2026-10-16" /></label>
            <label><span>UPC</span><input placeholder="Для нового релиза необязательно" /></label>
            <label><span>Версия</span><input defaultValue="Original" /></label>
          </div>
          <button type="button" className={albumCoverSelected ? styles.demoUploadReady : styles.demoUpload} onClick={() => setAlbumCoverSelected(true)}>
            {albumCoverSelected ? <CheckCircle size={28} /> : <ImageSquare size={28} />}
            <strong>{albumCoverSelected ? "tihaya_voda_3000.jpg" : "Выбрать обложку"}</strong>
            <small>Квадратное изображение от 3000 × 3000 px</small>
          </button>
        </div>
        <div className={styles.releaseFlowActions}><button type="button" className={styles.releaseBack} onClick={() => setFlowStep("choose")}>Назад</button><button type="button" className={styles.releaseNext} disabled={!albumCoverSelected} onClick={() => setFlowStep("album-tracks")}>Далее: добавить треки <ArrowRight size={16} /></button></div>
      </div>
    );
  }

  if (flowStep === "album-track") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setFlowStep("album-tracks")} aria-label="Вернуться к альбому"><ArrowLeft size={18} /></button>
          <div><h4>Новый трек</h4><p>Аудио, данные и текст внутри одного шага</p></div>
          <span className={styles.demoData}>Трек 4</span>
        </div>
        <div className={styles.releaseStepPanel}>
          <div className={styles.releaseStepCopy}><h5>Добавьте трек в альбом</h5><p>Здесь артист проходит тот же путь для каждой композиции альбома.</p></div>
          <button type="button" className={albumTrackSelected ? styles.demoUploadReady : styles.demoUpload} onClick={() => setAlbumTrackSelected(true)}>
            {albumTrackSelected ? <CheckCircle size={28} /> : <UploadSimple size={28} />}
            <strong>{albumTrackSelected ? "04_gorod_spit.wav" : "Выбрать WAV"}</strong><small>Демонстрационный файл</small>
          </button>
          <div className={styles.demoFormGrid}><label><span>Название</span><input defaultValue="Город спит" /></label><label><span>Исполнитель</span><input defaultValue="KONSTANTINOV" /></label><label><span>Автор музыки</span><input defaultValue="Михаил Константинов" /></label><label><span>ISRC</span><input placeholder="Необязательно" /></label></div>
          <label className={styles.demoWideField}><span>Текст песни</span><textarea defaultValue={"Город спит, а мы ещё слышим свет..."} /></label>
        </div>
        <div className={styles.releaseFlowActions}><button type="button" className={styles.releaseBack} onClick={() => setFlowStep("album-tracks")}>Назад</button><button type="button" className={styles.releaseNext} disabled={!albumTrackSelected} onClick={() => { setAlbumTracks((tracks) => tracks.some((track) => track.id === 4) ? tracks : [...tracks, { id: 4, title: "Город спит", file: "04_gorod_spit.wav", duration: "03:12" }]); setFlowStep("album-tracks"); }}>Добавить трек <Plus size={16} /></button></div>
      </div>
    );
  }

  if (flowStep === "album-tracks") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setFlowStep("album-general")} aria-label="Вернуться к данным альбома"><ArrowLeft size={18} /></button>
          <div><h4>Самый лучший альбом в мире</h4><p>Меняйте порядок треков перед отправкой</p></div>
          <span className={styles.demoData}>Этап 2 из 2</span>
        </div>
        <div className={styles.albumHeader}><div className={styles.albumCover}><MusicNotes size={30} /></div><div><span>Альбом / EP</span><strong>{albumTracks.length} трека</strong><small>KONSTANTINOV, 16 октября 2026</small></div><button type="button" onClick={() => setFlowStep("album-general")}><PencilSimple size={16} /> Изменить данные</button></div>
        <div className={styles.albumTracksHeading}><div><h5>Треклист</h5><p>Перетаскивайте треки за маркер. Соседние строки освободят место ещё до отпускания.</p></div><button type="button" onClick={() => { setAlbumTrackSelected(false); setFlowStep("album-track"); }}><Plus size={16} /> Добавить трек</button></div>
        <div className={styles.albumTrackList} ref={albumTrackListRef}>
          {albumTracks.map((track) => (
            <div className={styles.albumTrackRow} data-dragging={draggedTrackId === track.id} data-track-id={track.id} key={track.id}>
              <button type="button" className={styles.dragHandleButton} aria-label={`Изменить позицию трека ${track.title}. Текущая позиция ${albumTracks.findIndex((item) => item.id === track.id) + 1} из ${albumTracks.length}. Используйте стрелки вверх и вниз`} onPointerDown={(event) => beginPointerReorder(event, track.id)} onPointerMove={updatePointerReorder} onPointerUp={finishPointerReorder} onPointerCancel={finishPointerReorder} onKeyDown={(event) => { if (event.key === "ArrowUp") { event.preventDefault(); moveTrackWithKeyboard(track.id, -1); } if (event.key === "ArrowDown") { event.preventDefault(); moveTrackWithKeyboard(track.id, 1); } }}><DotsSixVertical size={22} aria-hidden="true" /></button><span className={styles.trackNumber}>{albumTracks.findIndex((item) => item.id === track.id) + 1}</span><div><strong>{track.title}</strong><small>{track.file}</small></div><time>{track.duration}</time>
            </div>
          ))}
        </div>
        <p className={styles.visuallyHidden} aria-live="polite" aria-atomic="true">{reorderAnnouncement}</p>
        <div className={styles.releaseFlowActions}><button type="button" className={styles.releaseBack} onClick={() => setFlowStep("album-general")}>Назад</button><button type="button" className={styles.releaseNext} onClick={() => setFlowStep("complete")}>Отправить альбом на модерацию <ArrowRight size={16} /></button></div>
      </div>
    );
  }

  if (flowStep !== "list") {
    return (
      <div className={styles.screenBody}>
        <div className={styles.releaseFlowHeading}>
          <button type="button" onClick={() => setFlowStep("list")} aria-label="Вернуться к релизам"><ArrowLeft size={18} /></button>
          <div><h4>Новый сингл</h4><p>Пройдите путь публикации так, как его видит артист</p></div>
          <span className={styles.demoData}>Интерактивное демо</span>
        </div>
        <div className={styles.releaseRoadmap} aria-label="Этапы загрузки сингла">
          {releaseDemoSteps.map(({ id, label, icon: Icon }, index) => (
            <button type="button" className={flowStep === id ? styles.releaseRoadmapActive : index < currentStepIndex ? styles.releaseRoadmapDone : undefined} disabled={index > currentStepIndex} onClick={() => setFlowStep(id)} key={id}>
              <span>{index < currentStepIndex ? <Check size={15} /> : <Icon size={15} />}</span>
              <small>{label}</small>
            </button>
          ))}
        </div>

        {flowStep === "audio" && (
          <div className={styles.releaseStepPanel}>
            <div className={styles.releaseStepCopy}><h5>Загрузите аудиофайл</h5><p>Финальная версия трека в WAV, стерео, 16/24-bit, 44 100 или 48 000 Гц.</p></div>
            <button type="button" className={audioSelected ? styles.demoUploadReady : styles.demoUpload} onClick={() => setAudioSelected(true)}>
              {audioSelected ? <CheckCircle size={28} /> : <UploadSimple size={28} />}
              <strong>{audioSelected ? "xtwze_master.wav" : "Выбрать демо-файл"}</strong>
              <small>{audioSelected ? "WAV готов к следующему шагу" : "Файл не будет загружен на сервер"}</small>
            </button>
            <label className={styles.demoCheckbox}><input type="checkbox" /> <span>Композиция без текста</span></label>
          </div>
        )}

        {flowStep === "track" && (
          <div className={styles.releaseStepPanel}>
            <div className={styles.releaseStepCopy}><h5>Расскажите о треке</h5><p>Эти метаданные помогут слушателям и площадкам правильно определить композицию.</p></div>
            <div className={styles.demoFormGrid}>
              <label><span>Название</span><input defaultValue="Самый лучший трек в мире" /></label>
              <label><span>Исполнитель</span><input defaultValue="KONSTANTINOV" /></label>
              <label><span>Жанр</span><select defaultValue="hip-hop"><option value="hip-hop">Hip-hop</option><option value="pop">Pop</option></select></label>
              <label><span>ISRC</span><input placeholder="Для нового трека необязательно" /></label>
              <label><span>Автор текста</span><input defaultValue="Константинов Михаил Алексеевич" /></label>
              <label><span>Превью с</span><input defaultValue="30 секунд" /></label>
            </div>
          </div>
        )}

        {flowStep === "release" && (
          <div className={styles.releaseStepPanel}>
            <div className={styles.releaseStepCopy}><h5>Информация о релизе</h5><p>Дата, обложка и дополнительные материалы для команды лейбла.</p></div>
            <div className={styles.releaseAssets}>
              <label className={styles.releaseDateControl}><CalendarBlank size={20} /><span><small>Дата релиза*</small><input type="date" defaultValue="2026-09-30" /></span></label>
              <button type="button" onClick={() => setCoverSelected(true)}><ImageSquare size={20} /><span><small>Обложка*</small><strong>{coverSelected ? "cover_3000.jpg" : "Выбрать демо-файл"}</strong></span></button>
              <button type="button" onClick={() => setVideoSelected(true)}><VideoCamera size={20} /><span><small>Видеошот</small><strong>{videoSelected ? "vertical_shot.mp4" : "Добавить при необходимости"}</strong></span></button>
              <button type="button" onClick={() => setDocumentSelected(true)}><FileText size={20} /><span><small>Документы</small><strong>{documentSelected ? "Права на инструментал.pdf" : "Приложить PDF"}</strong></span></button>
            </div>
            <label className={styles.demoWideField}><span>Ссылка на карточку артиста</span><input defaultValue="https://music.yandex.ru/artist/xtwze" /></label>
            <label className={styles.demoWideField}><span>Комментарий к релизу</span><textarea defaultValue="Материалы для проверки командой лейбла." /></label>
          </div>
        )}

        {flowStep === "promo" && (
          <div className={styles.releaseStepPanel}>
            <div className={styles.releaseStepCopy}><h5>Подача на промо</h5><p>Выберите, нужна ли редакционная подача для этого релиза.</p></div>
            <button type="button" className={styles.promoChoice} aria-pressed={promoRequested} onClick={() => setPromoRequested((value) => !value)}>
              <span><strong>Нужна подача на промо</strong><small>Система учтёт необходимые рабочие дни до даты релиза.</small></span>
              <i className={promoRequested ? styles.switchOn : styles.switchOff}><span /></i>
            </button>
            {promoRequested && (
              <div className={styles.promoFields}>
                <label><span>Пресс-релиз</span><textarea defaultValue="История и идея будущего сингла." /></label>
                <label><span>Маркетинговый план</span><textarea defaultValue="Контент и рекламные активности к релизу." /></label>
              </div>
            )}
          </div>
        )}

        {flowStep === "lyrics" && (
          <div className={styles.releaseStepPanel}>
            <div className={styles.releaseStepCopy}><h5>Проверьте текст песни</h5><p>Добавьте текст и отметьте Explicit перед отправкой релиза на модерацию.</p></div>
            <label className={styles.demoWideField}><span>Текст песни</span><textarea defaultValue={"Город гасит свет\nЯ слышу шаги после дождя..."} /></label>
            <label className={styles.demoCheckbox}><input type="checkbox" /> <span>Есть ненормативная лексика (Explicit)</span></label>
          </div>
        )}

        <div className={styles.releaseFlowActions}>
          <button type="button" className={styles.releaseBack} onClick={goBack}>Назад</button>
          <button type="button" className={styles.releaseNext} onClick={goNext} disabled={(flowStep === "audio" && !audioSelected) || (flowStep === "release" && !coverSelected)}>
            {flowStep === "lyrics" ? "Проверить и отправить" : "Продолжить"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Мои релизы</h4><p>Черновики и история отправки</p></div><button className={styles.actionButton} type="button" onClick={startRelease}>Новый релиз</button></div>
      <div className={styles.dataList}>
        {artistReleaseRows.map((release) => (
          <div className={styles.releaseRow} key={release.title}>
            <div className={styles.coverPlaceholder}><MusicNotes size={18} weight="light" /></div>
            <div><strong>{release.title}</strong><span>{release.detail}</span></div>
            <Status tone={release.tone}>{release.status}</Status>
            <button className={styles.rowAction} type="button">Подробнее</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistDocuments() {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Документы</h4><p>Договоры и квартальные отчёты</p></div><button className={styles.actionButton} type="button">Загрузить договор</button></div>
      <div className={styles.dataList}>
        <div className={styles.documentRow}><FileText size={22} weight="light" /><div><strong>Лицензионный договор</strong><span>ЛД-2026-014, 18.08.2026</span></div><Status tone="attention">Нужно подписать</Status><button className={styles.rowAction} type="button">Открыть</button></div>
        <div className={styles.documentRow}><FileText size={22} weight="light" /><div><strong>Отчёт за II квартал</strong><span>royalty_2026_q2.pdf</span></div><Status tone="success">Доступен</Status><button className={styles.rowAction} type="button">Скачать</button></div>
        <div className={styles.documentRow}><FileText size={22} weight="light" /><div><strong>Документ к релизу «Хит на сто процентов»</strong><span>Проверен командой лейбла</span></div><Status tone="success">Принят</Status><button className={styles.rowAction} type="button">Открыть</button></div>
      </div>
    </div>
  );
}

function ArtistBalance() {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Баланс</h4><p>Начисления и выплаты</p></div><button className={styles.actionButton} type="button">Запросить выплату</button></div>
      <div className={styles.balanceHero}><span>Доступно к выводу</span><strong>7 340 ₽</strong><small>Следующее обновление после нового отчёта лейбла</small></div>
      <div className={styles.activityBlock}>
        <div className={styles.blockHeading}><h5>Последние операции</h5></div>
        <div className={styles.moneyRow}><div><strong>Роялти за II квартал</strong><span>20 августа 2026</span></div><strong>+4 820 ₽</strong></div>
        <div className={styles.moneyRow}><div><strong>Роялти за I квартал</strong><span>16 мая 2026</span></div><strong>+2 520 ₽</strong></div>
      </div>
    </div>
  );
}

function DemoChat({ perspective, messages, onSend }: { perspective: ChatSender; messages: DemoMessage[]; onSend: (text: string) => void }) {
  const [draft, setDraft] = useState(perspective === "artist" ? "Подскажите, когда ждать решение по документам?" : "Документы проверили. Релиз можно отправлять на модерацию.");
  const isLabel = perspective === "label";
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>{isLabel ? "Чат с артистом" : "Чат с лейблом"}</h4><p>{isLabel ? "KONSTANTINOV, релиз «Хит на сто процентов»" : "Вопросы по релизам, документам и выплатам"}</p></div><div className={styles.screenHeadingMeta}><span className={styles.demoData}>Демонстрационный чат</span><Status tone="success">На связи</Status></div></div>
      <div className={styles.chatPanel}>
        {messages.map((message) => (
          <div className={`${styles.chatMessage} ${message.sender === perspective ? styles.chatMessageOwn : ""}`} key={message.id}>
            <span>{message.sender === "label" ? "Команда лейбла" : "KONSTANTINOV"}</span><p>{message.text}</p><small>{message.time}</small>
          </div>
        ))}
        <div className={styles.chatComposer}><input aria-label={isLabel ? "Сообщение артисту" : "Сообщение лейблу"} value={draft} onChange={(event) => setDraft(event.target.value)} /><button type="button" onClick={() => { onSend(draft.trim()); setDraft(""); }} disabled={!draft.trim()}><PaperPlaneTilt size={17} /> Отправить</button></div>
      </div>
    </div>
  );
}

export function ProductDemo() {
  const [workspace, setWorkspace] = useState<Workspace>("label");
  const [activePage, setActivePage] = useState("overview");
  const [reportState, setReportState] = useState<ReportState>("idle");
  const [releaseIntent, setReleaseIntent] = useState<"list" | "new" | "edit">("list");
  const [releaseInstance, setReleaseInstance] = useState(0);
  const [messages, setMessages] = useState<DemoMessage[]>([
    { id: 1, sender: "artist", text: "Добрый день! Добавил договор на бит и обновил данные авторов в релизе «Хит на сто процентов».", time: "12:42" },
    { id: 2, sender: "label", text: "Получили. Проверим документы и вернёмся с ответом в этом чате.", time: "12:47" },
    { id: 3, sender: "artist", text: "Спасибо. Если понадобятся дополнительные файлы, сразу загружу.", time: "12:49" },
  ]);
  const [labelUnread, setLabelUnread] = useState(1);
  const [artistUnread, setArtistUnread] = useState(0);

  useEffect(() => {
    if (reportState !== "processing") return;
    const timer = window.setTimeout(() => setReportState("ready"), 1400);
    return () => window.clearTimeout(timer);
  }, [reportState]);

  function changeWorkspace(next: Workspace) {
    setWorkspace(next);
    setActivePage(next === "label" ? "overview" : "home");
    setReportState("idle");
  }

  function openNewRelease() {
    setActivePage("releases");
    setReleaseIntent("new");
    setReleaseInstance((value) => value + 1);
  }

  function openReleaseEditor() {
    setActivePage("releases");
    setReleaseIntent("edit");
    setReleaseInstance((value) => value + 1);
  }

  function openChat(owner: ChatSender) {
    setActivePage("chat");
    if (owner === "label") setLabelUnread(0);
    else setArtistUnread(0);
  }

  function sendMessage(sender: ChatSender, text: string) {
    setMessages((current) => [...current, { id: Date.now(), sender, text, time: "сейчас" }]);
    if (sender === "artist") setLabelUnread((value) => value + 1);
    else setArtistUnread((value) => value + 1);
  }

  function renderScreen() {
    if (workspace === "label") {
      if (activePage === "releases") return <LabelReleases />;
      if (activePage === "reports") return <LabelReports reportState={reportState} onUpload={() => setReportState("processing")} />;
      if (activePage === "artists") return <LabelArtists />;
      if (activePage === "chat") return <DemoChat perspective="label" messages={messages} onSend={(text) => sendMessage("label", text)} />;
      if (activePage === "custom") return <LabelCustomFeature />;
      return <LabelOverview />;
    }

    if (activePage === "releases") return <ArtistReleases key={`${releaseIntent}-${releaseInstance}`} initialMode={releaseIntent} />;
    if (activePage === "documents") return <ArtistDocuments />;
    if (activePage === "balance") return <ArtistBalance />;
    if (activePage === "chat") return <DemoChat perspective="artist" messages={messages} onSend={(text) => sendMessage("artist", text)} />;
    return <ArtistHome onNewRelease={openNewRelease} onEditRelease={openReleaseEditor} onChat={() => openChat("artist")} />;
  }

  return (
    <section id="demo" className={`${styles.demoSection} section-shell reveal-section`} aria-labelledby="demo-title">
      <div className={styles.intro}>
        <h2 id="demo-title">Посмотрите платформу в работе</h2>
        <p>Переключайтесь между кабинетами и откройте основные сценарии команды лейбла и артиста.</p>
      </div>

      <div className={styles.workspaceTabs} role="tablist" aria-label="Выберите кабинет">
        <button type="button" role="tab" aria-selected={workspace === "label"} className={workspace === "label" ? styles.workspaceTabActive : styles.workspaceTab} onClick={() => changeWorkspace("label")}>
          <IdentificationCard size={20} weight="light" />
          <span><strong>Кабинет лейбла</strong><small>Управление всей операционной работой</small></span>
        </button>
        <button type="button" role="tab" aria-selected={workspace === "artist"} className={workspace === "artist" ? styles.workspaceTabActive : styles.workspaceTab} onClick={() => changeWorkspace("artist")}>
          <Headphones size={20} weight="light" />
          <span><strong>Кабинет артиста</strong><small>Релизы, документы, отчёты и баланс</small></span>
        </button>
      </div>

      <div className={styles.productFrame}>
        <aside className={styles.demoSidebar} aria-label={workspace === "label" ? "Разделы кабинета лейбла" : "Разделы кабинета артиста"}>
          <div className={styles.sidebarBrand}><span className={styles.brandDisc} aria-hidden="true" />LabelCloud</div>
          <div className={styles.profile}>
            <span>{workspace === "label" ? "ВЛ" : "K"}</span>
            <div><strong>{workspace === "label" ? "Ваш лейбл" : "KONSTANTINOV"}</strong><small>{workspace === "label" ? "Название и логотип" : "Артист"}</small></div>
          </div>
          <nav>
            {navigation[workspace].map(({ id, label, icon: Icon }) => {
              const unread = id === "chat" ? workspace === "label" ? labelUnread : artistUnread : 0;
              return (
              <button type="button" className={activePage === id ? styles.navActive : styles.navButton} aria-current={activePage === id ? "page" : undefined} onClick={() => { if (id === "new-release") openNewRelease(); else if (id === "chat") openChat(workspace); else { if (id === "releases") { setReleaseIntent("list"); setReleaseInstance((value) => value + 1); } setActivePage(id); } }} key={id}>
                <Icon size={18} weight="light" /><span className={styles.navLabel}>{label}</span>{unread > 0 && <span className={styles.navBadge} aria-label={unread === 1 ? "1 непрочитанное сообщение" : `${unread} непрочитанных сообщения`}>{unread}</span>}
              </button>
            )})}
          </nav>
          {workspace === "label" && (
            <button type="button" className={activePage === "custom" ? styles.navActive : styles.navButton} onClick={() => setActivePage("custom")}>
              <Sparkle size={18} weight="light" /> Нажми на меня
            </button>
          )}
          <p>Интерактивная демонстрация</p>
        </aside>
        <div className={styles.productScreen} role="tabpanel" aria-live="polite">
          {renderScreen()}
        </div>
      </div>
    </section>
  );
}
