"use client";

import Link from "next/link";
import { BRAND } from "@/lib/data";
import { useStore } from "@/lib/store";
import { IconCheck, IconWhatsApp } from "./Icons";

export default function Overlays() {
  const { toast } = useStore();
  return (
    <>
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Run Machine, I need help choosing gear.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-30 right-4 bottom-4 w-14 h-14 rounded-full bg-[#25d366] text-white grid place-items-center shadow-lg shadow-black/40 hover:scale-105 transition-transform"
      >
        <IconWhatsApp className="w-7 h-7" />
      </a>

      <div aria-live="polite" className="fixed z-50 left-1/2 -translate-x-1/2 bottom-6 pointer-events-none">
        {toast && (
          <div key={toast.id} className="rise pointer-events-auto flex items-center gap-3 bg-fg text-ink rounded-full pl-4 pr-2 py-2 shadow-xl text-sm font-semibold">
            <IconCheck className="w-4 h-4" />
            <span className="whitespace-nowrap">{toast.text}</span>
            {toast.href && (
              <Link href={toast.href} className="bg-ink text-fg rounded-full px-3 py-1.5 text-xs whitespace-nowrap">
                {toast.cta}
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
