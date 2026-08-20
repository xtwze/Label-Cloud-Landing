import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bank,
  FileText,
  Headphones,
  IdentificationCard,
  PaperPlaneTilt,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";

import { EnquiryForm } from "@/components/enquiry-form";
import { MotionFrame } from "@/components/motion-frame";
import { YandexMetrica } from "@/components/yandex-metrica";

const capabilities = [
  { icon: IdentificationCard, title: "Артисты", text: "Единые карточки, документы, реквизиты и история работы." },
  { icon: Headphones, title: "Релизы", text: "Артисты загружают треки и материалы прямо в кабинет вашего лейбла." },
  { icon: FileText, title: "Договоры", text: "Ваши шаблоны договоров и полный документооборот внутри платформы." },
  { icon: PaperPlaneTilt, title: "Отгрузка", text: "Команда проверяет релиз и передаёт его дистрибьютору через платформу." },
  { icon: SlidersHorizontal, title: "Отчёты", text: "Автоматическая обработка отчётов дистрибьютора и распределение по артистам." },
  { icon: Bank, title: "Балансы", text: "Начисления, выплаты и понятная финансовая картина артиста." },
];

const workflow = [
  ["Соберите данные", "Артист заполняет только те поля, которые нужны вашему лейблу."],
  ["Сформируйте документы", "Данные автоматически подставляются в ваши договоры и документы."],
  ["Загрузите отчёт", "Система автоматически обработает отчёт дистрибьютора и распределит начисления по артистам."],
];

export default function Home() {
  return (
    <MotionFrame>
      <YandexMetrica />
      <header className="site-header">
        <a className="header-brand" href="#top" aria-label="LabelCloud, на главную">
          <Image
            className="header-brand-image"
            src="/images/brand/labelcloud-logo.png"
            alt=""
            width={1972}
            height={354}
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#platform">Платформа</a>
          <a href="#approach">Подход</a>
        </nav>
        <a className="header-cta" href="#contact">Оставить заявку</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="hero-kicker hero-reveal">B2B-платформа для музыкальных лейблов</p>
            <h1 id="hero-title" className="hero-title hero-reveal">Операционная система музыкального лейбла</h1>
            <p className="hero-copy hero-reveal">Артисты загружают треки и документы. Лейбл ведёт релизы, отчёты и выплаты в одном кабинете.</p>
            <div className="hero-actions hero-reveal">
              <a className="button button-primary" href="#contact">Оставить заявку</a>
              <a className="button button-quiet" href="#platform">Как это работает</a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Клиенты LabelCloud">
          <p>Платформа уже работает для</p>
          <div className="client-logos">
            <a className="client-logo" href="https://yandex.ru/maps/org/xlora_music/137660837072/" target="_blank" rel="noreferrer" aria-label="Открыть страницу XLORA">
              <Image src="/images/xlora-logo.png" alt="XLORA" width={897} height={303} />
            </a>
          </div>
        </section>

        <section className="manifesto section-shell reveal-section">
          <h2>Лейбл не должен жить в десятках таблиц и переписок.</h2>
          <p>Личный кабинет дистрибьютора, собранный для вашего лейбла: артисты загружают треки и документы, команда ведёт релизы, договоры и отчётность.</p>
        </section>

        <section id="platform" className="capabilities section-shell" aria-labelledby="capabilities-title">
          <div className="section-heading reveal-section">
            <h2 id="capabilities-title">Весь рабочий контур</h2>
            <p>Базовые функции остаются вместе. Платформа не превращает нормальную работу в набор платных ограничений.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <article className={`capability capability-${index + 1}`} key={title}>
                <Icon size={28} weight="light" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow" aria-labelledby="workflow-title">
          <div className="workflow-sticky section-shell">
            <div className="workflow-copy">
              <h2 id="workflow-title">Один путь. От знакомства до выплаты.</h2>
              <p>Состояние не теряется между отделами, файлами и каналами связи.</p>
            </div>
            <div className="workflow-track" aria-label="Рабочий процесс LabelCloud">
              {workflow.map(([title, text]) => (
                <article className="workflow-item" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="custom section-shell reveal-section">
          <div className="custom-statement"><h2>Не подгоняем лейбл под чужую схему.</h2></div>
          <div className="custom-copy">
            <p>Настроим поля, документы, роли и этапы работы под ваши правила. Добавим необходимые функции и встроим их в общий процесс.</p>
            <a href="#contact" className="text-link">Обсудить свой сценарий <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="migration section-shell reveal-section">
          <div className="migration-number" aria-hidden="true">0 ₽</div>
          <div>
            <h2>Переносим стартовую базу бесплатно</h2>
            <p>Изучим формат ваших данных и перенесём существующих артистов и релизы.</p>
          </div>
        </section>

        <section className="pricing section-shell reveal-section">
          <h2>Платформа под задачи вашего лейбла</h2>
          <p>Количество артистов, объём каталога и набор функций определяют конфигурацию LabelCloud.</p>
          <a className="button button-primary" href="#contact">Получить предложение</a>
        </section>

        <section id="contact" className="contact section-shell" aria-labelledby="contact-title">
          <div className="contact-intro reveal-section">
            <h2 id="contact-title">Расскажите о вашем лейбле</h2>
            <p>Свяжемся с вами, уточним процессы и покажем, как LabelCloud может работать в вашем случае.</p>
            <div className="direct-contacts">
              <a href="mailto:mihail.a.konstantinov@gmail.com">mihail.a.konstantinov@gmail.com</a>
              <a href="https://t.me/xtwze" target="_blank" rel="noreferrer">Telegram @xtwze</a>
            </div>
          </div>
          <EnquiryForm />
        </section>
      </main>

      <footer className="footer section-shell">
        <div>
          <a className="brand" href="#top">LabelCloud</a>
          <p>Операционная платформа для музыкальных лейблов.</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Политика обработки данных</Link>
          <a href="mailto:mihail.a.konstantinov@gmail.com">Email</a>
          <a href="https://t.me/xtwze" target="_blank" rel="noreferrer">Telegram</a>
        </div>
        <p className="legal">Самозанятый Константинов Михаил Алексеевич</p>
      </footer>
    </MotionFrame>
  );
}
