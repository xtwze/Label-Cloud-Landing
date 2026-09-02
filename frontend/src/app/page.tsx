import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gift } from "@phosphor-icons/react/dist/ssr";

import { CapabilitiesShowcase } from "@/components/capabilities-showcase";
import { EnquiryForm } from "@/components/enquiry-form";
import { MotionFrame } from "@/components/motion-frame";
import { ProductDemo } from "@/components/product-demo";
import { YandexMetrica } from "@/components/yandex-metrica";

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
          <a href="#demo">Демо</a>
          <a href="#approach">Подход</a>
        </nav>
        <a className="header-cta" href="#contact">Оставить заявку</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="hero-kicker hero-reveal">B2B-платформа для музыкальных лейблов</p>
            <h1 id="hero-title" className="hero-title hero-reveal">Управление музыкальным лейблом</h1>
            <p className="hero-copy hero-reveal">Артисты загружают треки и документы. Лейбл ведёт релизы, договоры и квартальную отчётность в одном кабинете.</p>
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

        <CapabilitiesShowcase />

        <ProductDemo />

        <section className="lyric-guard-section">
          <aside className="lyric-guard-bonus section-shell reveal-section" aria-labelledby="lyric-guard-title">
              <div className="lyric-guard-bonus-copy">
                <div className="lyric-guard-gift-mark"><Gift size={28} weight="light" aria-hidden="true" /><span>Отдельный продукт</span></div>
                <strong className="lyric-guard-gift">В подарок</strong>
                <h3 id="lyric-guard-title">Lyric Guard входит в LabelCloud</h3>
                <p>Проверяет тексты до модерации, находит рискованные фрагменты, учитывает контекст и отдельно отмечает ненормативную лексику.</p>
                <div className="lyric-guard-topics" aria-label="Примеры категорий проверки">
                  <span>Наркотики</span><span>Экстремизм</span><span>Политические высказывания</span><span>Насилие</span><span>Саморазрушительное поведение</span>
                </div>
                <div className="lyric-guard-notes">
                  <strong>Все функции Lyric Guard доступны вместе с LabelCloud без дополнительной оплаты.</strong>
                  <small>Технический индикатор риска, не юридическая экспертиза.</small>
                </div>
              </div>
              <div className="lyric-guard-result" aria-label="Демонстрационный результат Lyric Guard">
                <div><span>Демонстрационная проверка</span><strong>Нужна ручная проверка</strong></div>
                <ol>
                  <li><span>12</span><p>Неоднозначный фрагмент. Система передала контекст модератору.</p><b>Средний риск</b></li>
                  <li><span>28</span><p>Запрещённых тем в контексте не найдено.</p><b>Низкий риск</b></li>
                </ol>
              </div>
          </aside>
        </section>

        <section id="approach" className="custom section-shell reveal-section">
          <div className="custom-statement"><h2>Не подгоняем лейбл под чужую схему.</h2></div>
          <div className="custom-copy">
            <p>Настроим поля, документы, роли и этапы работы под ваши правила. Добавим необходимые функции и встроим их в общий процесс.</p>
            <p className="custom-landing">Разработаем отдельный лендинг под ваш бренд, домен и визуальный язык. Для артистов это будет выглядеть как собственная система вашего лейбла.</p>
            <a href="#contact" className="text-link">Обсудить свой сценарий <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="migration-section">
          <div className="migration section-shell reveal-section">
            <div className="migration-number" aria-hidden="true">0 ₽</div>
            <div>
              <h2>Переносим стартовую базу бесплатно</h2>
              <p>Изучим формат ваших данных и перенесём существующих артистов и релизы.</p>
            </div>
          </div>
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

      <footer id="site-footer" className="footer section-shell">
        <div className="footer-brand">
          <a className="brand" href="#top">LabelCloud</a>
          <p>Управление музыкальным лейблом.</p>
          <p className="creator-credit">С заботой от <strong>KONSTANTINOV</strong></p>
        </div>

        <div className="footer-owner" aria-label="Сведения о владельце сайта">
          <span>Владелец сайта</span>
          <strong>Константинов Михаил Алексеевич</strong>
          <span>Самозанятый · плательщик НПД</span>
          <a href="mailto:mihail.a.konstantinov@gmail.com">mihail.a.konstantinov@gmail.com</a>
        </div>

        <nav className="footer-links" aria-label="Правовая информация и контакты">
          <Link href="/privacy">Политика обработки данных</Link>
          <Link href="/consent">Согласие на обработку данных</Link>
          <a href="https://t.me/xtwze" target="_blank" rel="noreferrer">Telegram</a>
        </nav>

        <p className="legal">© 2026 LabelCloud</p>
      </footer>
    </MotionFrame>
  );
}
