"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "divinestays-analytics-consent";

export default function AnalyticsConsent() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(window.localStorage.getItem(STORAGE_KEY) === "granted");
  }, []);

  if (!measurementId || consent) {
    if (!measurementId) return null;
    return (
      <>
        <Script src={"https://www.googletagmanager.com/gtag/js?id=" + measurementId} strategy="afterInteractive" />
        <Script id="divinestays-gtag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config", "${measurementId}", { anonymize_ip: true });`}
        </Script>
      </>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-[#e7e0d4] bg-white p-4 shadow-xl sm:flex sm:items-center sm:justify-between sm:gap-5">
      <p className="text-xs leading-5 text-[#6f6a61]">
        DivineStays uses analytics to understand website traffic and improve the site. You can accept or decline optional analytics.
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button onClick={() => { window.localStorage.setItem(STORAGE_KEY, "denied"); setConsent(true); }} className="rounded-full border border-[#e7e0d4] px-4 py-2 text-xs font-semibold">Decline</button>
        <button onClick={() => { window.localStorage.setItem(STORAGE_KEY, "granted"); setConsent(true); }} className="rounded-full bg-[#1b1a18] px-4 py-2 text-xs font-semibold text-white">Accept analytics</button>
      </div>
    </div>
  );
}
