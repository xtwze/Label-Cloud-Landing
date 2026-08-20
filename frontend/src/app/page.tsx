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
  { icon: Headphones, title: "Релизы", text: "Понятный путь релиза от заявки до готовности к отгрузке." },
  { icon: FileText, title: "Договоры", text: "Генерация документов из ваших шаблонов и данных артиста." },
  { icon: PaperPlaneTilt, title: "Отгрузка", text: "Рабочие статусы и контроль материалов в одном процессе." },
  { icon: SlidersHorizontal, title: "Отчёты", text: "Загрузка отчётных данных без ручной сборки из разных файлов." },
  { icon: Bank, title: "Балансы", text: "Начисления, выплаты и понятная финансовая картина артиста." },
];

const workflow = [
  ["Соберите данные", "Артист заполняет только те поля, которые нужны вашему лейблу."],
  ["Подготовьте релиз", "Команда проверяет материалы и ведёт релиз по понятным статусам."],
  ["Сформируйте документы", "Данные подставляются в согласованные шаблоны без повторного ввода."],
  ["Загрузите отчёт", "Начисления и баланс артиста обновляются в общей системе."],
];

export default function Home() {
  return (
    <MotionFrame>
      <YandexMetrica />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="LabelCloud, на главную">LabelCloud</a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#platform">Платформа</a>
          <a href="#approach">Подход</a>
          <a href="#case">Кейс</a>
        </nav>
        <a className="header-cta" href="#contact">Оставить заявку</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/images/labelcloud-vinyl-hero.png"
            alt="Минималистичный крупный план виниловой пластинки"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-kicker hero-reveal">B2B-платформа для музыкальных лейблов</p>
            <h1 id="hero-title" className="hero-title hero-reveal">Операционная система музыкального лейбла</h1>
            <p className="hero-copy hero-reveal">Артисты, релизы, договоры, отчёты и выплаты в едином рабочем пространстве.</p>
            <div className="hero-actions hero-reveal">
              <a className="button button-primary" href="#contact">Оставить заявку</a>
              <a className="button button-quiet" href="#platform">Как это работает</a>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Клиенты LabelCloud">
          <p>Платформа уже работает для</p>
          <a className="xlora-mark" href="#case" aria-label="Перейти к кейсу XLORA">
            <Image src="/images/xlora-logo.png" alt="XLORA" width={897} height={303} />
          </a>
          <p>Следующий кабинет может быть вашим</p>
        </section>

        <section className="manifesto section-shell reveal-section">
          <h2>Лейбл не должен жить в десятках таблиц и переписок.</h2>
          <p>LabelCloud соединяет ежедневные процессы в один понятный маршрут. Команда видит состояние работы, артист понимает следующий шаг.</p>
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
            <p>Настроим поля, документы, роли и этапы работы под ваши правила. Нестандартную функцию сначала обсудим, затем честно оценим и встроим в общий процесс.</p>
            <a href="#contact" className="text-link">Обсудить свой сценарий <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="migration section-shell reveal-section">
          <div className="migration-number" aria-hidden="true">0 ₽</div>
          <div>
            <h2>Переносим стартовую базу бесплатно</h2>
            <p>Изучим формат ваших данных и перенесём существующих артистов и релизы. Сложное восстановление или нестандартное преобразование заранее согласуем отдельно.</p>
          </div>
        </section>

        <section id="case" className="case-section section-shell" aria-labelledby="case-title">
          <div className="case-visual reveal-section">
            <Image src="/images/xlora-identity.png" alt="Фирменная графика музыкального лейбла XLORA" width={1983} height={793} sizes="(max-width: 768px) 100vw, 58vw" />
          </div>
          <div className="case-copy reveal-section">
            <Image src="/images/xlora-logo.png" alt="XLORA" width={897} height={303} />
            <h2 id="case-title">Первый рабочий контур LabelCloud</h2>
            <p>Для XLORA платформа объединяет работу с артистами, релизами, договорами, отчётностью и поддержкой.</p>
            <p className="case-note">Показываем только подтверждённые возможности, без вымышленных цифр и результатов.</p>
          </div>
        </section>

        <section className="pricing section-shell reveal-section">
          <h2>Стоимость зависит от масштаба и задач</h2>
          <p>Обсудим число артистов, объём каталога, миграцию и индивидуальные функции. После разговора подготовим понятное предложение.</p>
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
