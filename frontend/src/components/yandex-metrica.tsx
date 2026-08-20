"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const storageKey = "labelcloud-analytics-consent";

export function YandexMetrica() {
  const counterId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored !== "accepted" && stored !== "declined") return;
    const timer = window.setTimeout(() => setChoice(stored), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!counterId) return null;

  const saveChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(storageKey, value);
    setChoice(value);
  };

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script id="yandex-metrica" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(${Number(counterId)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
          </Script>
        </>
      )}
      {choice === null && (
        <aside className="cookie-banner" aria-label="Настройки аналитики">
          <p>Мы используем cookie Яндекс Метрики только с вашего согласия. Подробнее в <Link href="/privacy">политике</Link>.</p>
          <div>
            <button className="cookie-secondary" type="button" onClick={() => saveChoice("declined")}>Только необходимые</button>
            <button className="cookie-primary" type="button" onClick={() => saveChoice("accepted")}>Разрешить аналитику</button>
          </div>
        </aside>
      )}
    </>
  );
}
