"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionFrame({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
      .from(".hero-image", { scale: 1.04, duration: 1.4 })
      .from(".hero-reveal", { y: 24, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, 0.16);

    ScrollTrigger.batch(".reveal-section", {
      start: "top 84%",
      once: true,
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.08, ease: "power3.out", overwrite: true },
        );
      },
    });

    const workflowItems = gsap.utils.toArray<HTMLElement>(".workflow-item");
    gsap.from(workflowItems, {
      x: 44,
      autoAlpha: 0,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: { trigger: ".workflow-track", start: "top 74%", once: true },
    });
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
