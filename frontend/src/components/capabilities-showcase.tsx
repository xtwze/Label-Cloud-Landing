"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Archive,
  ArrowUpRight,
  ChatCircleDots,
  FileAudio,
  FileText,
  IdentificationCard,
  ImageSquare,
  SlidersHorizontal,
} from "@phosphor-icons/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const secondaryOutcomes = [
  {
    icon: Archive,
    title: "Вся история артиста рядом",
    text: "Релизы, договоры и связанные материалы сохраняются в общей истории и доступны в любой момент.",
  },
  {
    icon: ChatCircleDots,
    title: "Лёгкая связь с артистом",
    text: "Чат встроен в LabelCloud: не нужно переходить в Telegram и другие сервисы. Вся коммуникация остаётся рядом с артистом, релизами и документами.",
  },
];

export function CapabilitiesShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const pieces = gsap.utils.toArray<HTMLElement>(".release-piece");
      const stage = root.current?.querySelector<HTMLElement>(".capability-stage");
      const hub = root.current?.querySelector<HTMLElement>(".labelcloud-hub");
      const solution = root.current?.querySelector<HTMLElement>(".release-solution");
      const metrics = root.current?.querySelector<HTMLElement>(".metric-stage");
      const metricCards = gsap.utils.toArray<HTMLElement>(".time-win");

      if (!stage || !hub || !solution || !metrics || pieces.length === 0) return;

      gsap.set(hub, { autoAlpha: 0, scale: 0.72 });
      gsap.set(".hub-orbit-line", { strokeDashoffset: 100 });
      gsap.set(".hub-orbit-arrivals", { autoAlpha: 0 });
      gsap.set(solution, { autoAlpha: 0, scale: 0.88, y: 28 });
      gsap.set(metrics, { autoAlpha: 0, yPercent: 22 });
      gsap.set(metricCards, { y: 36 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".capability-scroll",
          start: "top top",
          end: "+=2300",
          pin: ".capability-stage",
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(pieces, {
          x: (_index, target: HTMLElement) => {
            const stageRect = stage.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            return stageRect.left + stageRect.width / 2 - (targetRect.left + targetRect.width / 2);
          },
          y: (_index, target: HTMLElement) => {
            const stageRect = stage.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            return stageRect.top + stageRect.height / 2 - (targetRect.top + targetRect.height / 2);
          },
          rotation: 0,
          scale: 0.18,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 1,
        })
        .to(".capability-eyebrow", { autoAlpha: 0, y: -16, duration: 0.35 }, 0)
        .to(hub, { autoAlpha: 1, scale: 1, duration: 0.78, ease: "power3.out" }, "-=0.42")
        .to(".hub-orbit-line", { strokeDashoffset: 0, duration: 0.78, ease: "power2.out" }, "<")
        .to(".hub-orbit-arrivals", { autoAlpha: 1, duration: 0.3 }, "<0.42")
        .to(hub, { scale: 1.04, duration: 0.42 }, "+=0.38")
        .to(hub, { autoAlpha: 0, scale: 1.13, duration: 0.6 })
        .to(solution, { autoAlpha: 1, scale: 1, y: 0, duration: 0.85 }, "-=0.04")
        .to(solution, { autoAlpha: 0, scale: 0.9, yPercent: -18, duration: 0.8 }, "+=0.45")
        .to(metrics, { autoAlpha: 1, yPercent: 0, duration: 0.85 }, "-=0.04")
        .to(metricCards, { y: 0, duration: 0.65 }, "<0.08");
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <section ref={root} id="platform" className="capabilities capabilities-light" aria-labelledby="capabilities-title">
      <div className="capability-scroll">
        <div className="capability-stage">
          <p className="capability-eyebrow">Знакомо?</p>

          <div className="release-pieces" aria-label="Как релиз собирали раньше">
            <article className="release-piece release-piece-a">
              <FileAudio size={25} weight="light" aria-hidden="true" />
              <strong>Трек</strong>
              <p>в переписке</p>
            </article>
            <article className="release-piece release-piece-b">
              <ImageSquare size={25} weight="light" aria-hidden="true" />
              <strong>Обложка</strong>
              <p>на диске</p>
            </article>
            <article className="release-piece release-piece-c">
              <IdentificationCard size={25} weight="light" aria-hidden="true" />
              <strong>Данные</strong>
              <p>в таблице</p>
            </article>
          </div>

          <div className="labelcloud-hub" aria-label="В LabelCloud всё собрано и хранится в одном месте">
            <svg className="hub-orbit" viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
              <circle className="hub-orbit-surface" cx="300" cy="300" r="260" />
              <circle className="hub-orbit-inner" cx="300" cy="300" r="225" />
              <circle className="hub-orbit-line" cx="300" cy="300" r="260" pathLength="100" transform="rotate(-90 300 300)" />
              <g className="hub-orbit-arrivals">
                {[0, 120, 240].map((angle) => (
                  <g key={angle} transform={`rotate(${angle} 300 300)`}>
                    <path className="hub-orbit-arc" d="M 340.673 556.799 A 260 260 0 0 1 259.327 556.799" />
                    <circle className="hub-orbit-port" cx="300" cy="560" r="10" />
                    <circle className="hub-orbit-dot" cx="300" cy="560" r="4" />
                  </g>
                ))}
              </g>
            </svg>
            <span>Всё сходится сюда</span>
            <strong>LabelCloud</strong>
            <p>Всё собрано и хранится<br />в одном месте</p>
          </div>

          <div className="release-solution">
            <span className="solution-index">В LabelCloud</span>
            <h2 id="capabilities-title">Релиз приходит готовым к модерации</h2>
            <p>Артист загружает аудио, обложку и данные. LabelCloud проверяет комплектность и требования. Менеджеру остаётся принять решение.</p>
            <a className="release-demo-link" href="#demo">Посмотреть загрузку <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>

          <div className="metric-stage" aria-label="Экономия рабочего времени">
            <article className="time-win">
              <FileText size={27} weight="light" aria-hidden="true" />
              <p className="time-before">Было: до 20 минут на договор</p>
              <p className="time-now">Теперь с LabelCloud</p>
              <strong>0 минут</strong>
              <h3>Договор формируется автоматически</h3>
              <p>Данные артиста подставляются в шаблон вашего лейбла.</p>
            </article>
            <article className="time-win">
              <SlidersHorizontal size={27} weight="light" aria-hidden="true" />
              <p className="time-before">Было: 1-2 недели на квартальный отчёт</p>
              <p className="time-now">Теперь с LabelCloud</p>
              <strong>1 клик</strong>
              <h3>Начисления распределяются по артистам</h3>
              <p>LabelCloud разбирает загруженный отчёт и распределяет начисления.</p>
            </article>
          </div>
        </div>
      </div>

      <div className="secondary-outcomes section-shell">
        {secondaryOutcomes.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={24} weight="light" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
