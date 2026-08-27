"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bank,
  CalendarBlank,
  ChartLineUp,
  Check,
  CheckCircle,
  FileAudio,
  FileArrowUp,
  FileText,
  Headphones,
  IdentificationCard,
  ImageSquare,
  MusicNotes,
  PaperPlaneTilt,
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

type Workspace = "label" | "artist";
type ReportState = "idle" | "processing" | "ready";
type DashboardPeriod = "day" | "week" | "month" | "year";
type ReleaseDemoStep = "list" | "audio" | "track" | "release" | "promo" | "lyrics" | "complete";

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
  ],
  artist: [
    { id: "home", label: "Главная", icon: SquaresFour },
    { id: "releases", label: "Релизы", icon: Headphones },
    { id: "documents", label: "Документы", icon: FileText },
    { id: "balance", label: "Баланс", icon: Wallet },
  ],
};

const releaseRows = [
  { title: "После дождя", artist: "Константинов", status: "На проверке", tone: "attention" },
  { title: "Северный ветер", artist: "Вектор", status: "Принят", tone: "success" },
  { title: "Неон", artist: "Мира Ли", status: "Черновик", tone: "neutral" },
];

const artistRows = [
  { name: "Константинов", releases: "8 релизов", balance: "18 420 ₽" },
  { name: "Вектор", releases: "5 релизов", balance: "12 870 ₽" },
  { name: "Мира Ли", releases: "3 релиза", balance: "7 340 ₽" },
];

const artistReleaseRows = [
  { title: "Неон", detail: "Сингл, 1 трек", status: "Черновик", tone: "neutral" },
  { title: "Тихая вода", detail: "EP, 4 трека", status: "На проверке", tone: "attention" },
  { title: "Комната 17", detail: "Сингл, 1 трек", status: "Доставлен", tone: "success" },
];

const releaseDemoSteps = [
  { id: "audio", label: "WAV", icon: FileAudio },
  { id: "track", label: "Трек", icon: MusicNotes },
  { id: "release", label: "Релиз", icon: ImageSquare },
  { id: "promo", label: "Промо", icon: ChartLineUp },
  { id: "lyrics", label: "Текст", icon: TextAa },
] as const;

const dashboardSeries: Record<DashboardPeriod, number[]> = {
  day: [1, 2, 1, 3, 2, 4, 3],
  week: [3, 5, 4, 7, 6, 8, 7],
  month: [4, 7, 5, 9, 8, 11, 10, 13, 12, 15, 14, 18],
  year: [8, 11, 14, 17, 22, 24, 29, 33, 38, 42, 47, 53],
};

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
        <article><FileText size={20} weight="light" /><span>Договоры</span><strong>3</strong><small>требуют проверки</small></article>
        <article><MusicNotes size={20} weight="light" /><span>Релизы</span><strong>4</strong><small>ожидают решения</small></article>
        <article><Bank size={20} weight="light" /><span>Выплаты</span><strong>2</strong><small>заявки на вывод</small></article>
      </div>
      <div className={styles.dashboardSummary} aria-label="Статистика лейбла">
        <div><span>Всего релизов</span><strong>18</strong><small>2 добавлены сегодня</small></div>
        <div><span>Всего артистов</span><strong>12</strong><small>1 новый за месяц</small></div>
        <div><span>Договоров</span><strong>14</strong><small>11 подписаны</small></div>
      </div>
      <div className={styles.analyticsCard}>
        <div className={styles.analyticsHeading}>
          <div><span>Динамика</span><h5>Отправленные релизы</h5></div>
          <strong>{values.at(-1)}</strong>
        </div>
        <div className={styles.analyticsPeriods} role="group" aria-label="Период графика релизов">
          {(Object.keys(dashboardPeriodLabels) as DashboardPeriod[]).map((item) => (
            <button type="button" className={period === item ? styles.analyticsPeriodActive : undefined} onClick={() => setPeriod(item)} key={item}>
              {dashboardPeriodLabels[item]}
            </button>
          ))}
        </div>
        <div className={styles.chart} role="img" aria-label={`Демонстрационный график релизов за период: ${dashboardPeriodLabels[period]}`}>
          {values.map((value, index) => (
            <span key={`${period}-${index}`} style={{ height: `${Math.max(12, (value / maxValue) * 100)}%` }} title={`${value} релизов`} />
          ))}
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
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Артисты</h4><p>Данные, документы и финансовая история</p></div><button className={styles.actionButton} type="button">Добавить артиста</button></div>
      <div className={styles.dataList}>
        {artistRows.map((artist) => (
          <div className={styles.artistRow} key={artist.name}>
            <div className={styles.avatar}>{artist.name.slice(0, 1)}</div>
            <div><strong>{artist.name}</strong><span>{artist.releases}</span></div>
            <div className={styles.balanceValue}><span>Баланс</span><strong>{artist.balance}</strong></div>
            <button className={styles.rowAction} type="button">Карточка</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArtistHome() {
  return (
    <div className={styles.screenBody}>
      <div className={styles.screenHeading}><div><h4>Привет, Константинов</h4><p>Всё важное по вашему кабинету</p></div><span className={styles.demoData}>Демо артиста</span></div>
      <div className={styles.artistSummary}>
        <article><span>Доступный баланс</span><strong>7 340 ₽</strong><button type="button">Запросить выплату</button></article>
        <article><span>Релизы</span><strong>3</strong><small>1 релиз на проверке</small></article>
      </div>
      <div className={styles.artistNextStep}>
        <div className={styles.coverPlaceholder}><Headphones size={20} weight="light" /></div>
        <div><span>Продолжить работу</span><strong>Неон</strong><small>Черновик сохранён, заполнено 6 из 9 разделов</small></div>
        <button type="button">Открыть</button>
      </div>
    </div>
  );
}

function ArtistReleases() {
  const [flowStep, setFlowStep] = useState<ReleaseDemoStep>("list");
  const [audioSelected, setAudioSelected] = useState(false);
  const [promoRequested, setPromoRequested] = useState(false);
  const [coverSelected, setCoverSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [documentSelected, setDocumentSelected] = useState(false);

  const currentStepIndex = releaseDemoSteps.findIndex((step) => step.id === flowStep);

  function startRelease() {
    setAudioSelected(false);
    setPromoRequested(false);
    setCoverSelected(false);
    setVideoSelected(false);
    setDocumentSelected(false);
    setFlowStep("audio");
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
              <label><span>Название</span><input defaultValue="После дождя" /></label>
              <label><span>Исполнитель</span><input defaultValue="Константинов (XTWZE)" /></label>
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
        <div className={styles.documentRow}><FileText size={22} weight="light" /><div><strong>Документ к релизу «Тихая вода»</strong><span>Проверен командой лейбла</span></div><Status tone="success">Принят</Status><button className={styles.rowAction} type="button">Открыть</button></div>
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

export function ProductDemo() {
  const [workspace, setWorkspace] = useState<Workspace>("label");
  const [activePage, setActivePage] = useState("overview");
  const [reportState, setReportState] = useState<ReportState>("idle");

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

  function renderScreen() {
    if (workspace === "label") {
      if (activePage === "releases") return <LabelReleases />;
      if (activePage === "reports") return <LabelReports reportState={reportState} onUpload={() => setReportState("processing")} />;
      if (activePage === "artists") return <LabelArtists />;
      if (activePage === "custom") return <LabelCustomFeature />;
      return <LabelOverview />;
    }

    if (activePage === "releases") return <ArtistReleases />;
    if (activePage === "documents") return <ArtistDocuments />;
    if (activePage === "balance") return <ArtistBalance />;
    return <ArtistHome />;
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
            <span>{workspace === "label" ? "ВЛ" : "К"}</span>
            <div><strong>{workspace === "label" ? "Ваш лейбл" : "Константинов"}</strong><small>{workspace === "label" ? "Название и логотип" : "XTWZE, артист"}</small></div>
          </div>
          <nav>
            {navigation[workspace].map(({ id, label, icon: Icon }) => (
              <button type="button" className={activePage === id ? styles.navActive : styles.navButton} aria-current={activePage === id ? "page" : undefined} onClick={() => setActivePage(id)} key={id}>
                <Icon size={18} weight="light" />{label}
              </button>
            ))}
          </nav>
          {workspace === "label" && (
            <button type="button" className={activePage === "custom" ? styles.customNavActive : styles.customNavButton} onClick={() => setActivePage("custom")}>
              <Sparkle size={18} weight="light" />
              <span><strong>Функция под ваш процесс</strong><small>Нажмите, чтобы открыть</small></span>
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
