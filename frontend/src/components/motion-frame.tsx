"use client";

import Image from "next/image";
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

    const page = scope.current;
    const vinylStage = scope.current?.querySelector<HTMLElement>(".scroll-vinyl-stage");
    const vinylDisc = scope.current?.querySelector<HTMLElement>(".scroll-vinyl-disc");

    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline.from(".hero-reveal", { y: 24, autoAlpha: 0, duration: 0.75, stagger: 0.1 });

    if (page && vinylStage && vinylDisc) {
      gsap.set(vinylDisc, { rotation: -12, transformOrigin: "50% 50%" });

      gsap.to(vinylDisc, {
        rotation: 1068,
        ease: "none",
        scrollTrigger: {
          trigger: page,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(vinylStage, {
        scale: 0.66,
        xPercent: 10,
        opacity: 0.24,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom center",
          scrub: 0.7,
        },
      });
    }

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

  return (
    <div ref={scope} className="page-frame">
      <div className="scroll-vinyl" aria-hidden="true">
        <div className="scroll-vinyl-stage">
          <div className="scroll-vinyl-disc">
            <div className="vinyl-center-label">
              <Image
                className="vinyl-brand-mark"
                src="/images/brand/labelcloud-logo.png"
                alt=""
                width={1972}
                height={354}
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
