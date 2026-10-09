import type { Metadata } from "next";
import { IconWhatsApp } from "@/components/Icons";
import { BRAND, SHIPPING, inr } from "@/lib/data";

export const metadata: Metadata = { title: "Shipping, returns, COD & size guide" };

const FAQ = [
  {
    q: "How does Cash on Delivery work?",
    a: `Place the order without paying anything. Our team calls to confirm, then ships. You pay the delivery partner in cash or UPI. A ${inr(SHIPPING.codFee)} COD handling fee applies, and COD is available on orders up to ${inr(SHIPPING.codLimit)}.`,
  },
  {
    q: "How long does delivery take?",
    a: `Delhi NCR: 1–2 days. Rest of India: 3–7 days depending on pincode. Shipping is free above ${inr(SHIPPING.freeAbove)}, otherwise ${inr(SHIPPING.fee)}.`,
  },
  {
    q: "Can I see the exact bat before it ships?",
    a: "Yes. Message us on WhatsApp with the product and the weight you want — we send real-time photos and a video of the exact piece before dispatch.",
  },
  {
    q: "What is the return policy?",
    a: "Unused gear in original packing can be returned within 7 days of delivery. Bats that have been knocked-in, oiled or used can't be returned, but manufacturing defects are covered.",
  },
  {
    q: "Is there a warranty on bats?",
    a: "English willow bats carry a 3-month warranty against handle and blade breakage under normal leather-ball use. Surface cracks and edge marks are natural wear and aren't covered.",
  },
];

const SIZES = [
  ["Size 3", "Under 4'6\"", "6–8 yrs"],
  ["Size 4", "4'6\" – 4'9\"", "8–10 yrs"],
  ["Size 5", "4'9\" – 5'0\"", "10–12 yrs"],
  ["Size 6", "5'0\" – 5'3\"", "12–13 yrs"],
  ["Harrow", "5'3\" – 5'6\"", "13–15 yrs"],
  ["SH (Short Handle)", "5'6\" – 6'2\"", "15+ / adults"],
  ["LH (Long Handle)", "Above 6'2\"", "Adults"],
];

export default function HelpPage() {
  return (
    <div className="wrap py-8 md:py-12 max-w-3xl">
      <p className="eyebrow">Help centre</p>
      <h1 className="display text-5xl md:text-6xl mt-2">Shipping, returns & COD</h1>

      <div className="mt-8 space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="card p-5 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4">
              {f.q} <span className="text-brand group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <p className="text-muted mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 id="size" className="display text-4xl mt-14 scroll-mt-36">Bat size guide</h2>
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="p-4 font-medium">Bat size</th><th className="p-4 font-medium">Player height</th><th className="p-4 font-medium">Typical age</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((r) => (
              <tr key={r[0]} className="border-t border-line">
                <td className="p-4 font-semibold">{r[0]}</td><td className="p-4">{r[1]}</td><td className="p-4 text-muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-6 mt-10">
        <h2 className="font-bold text-lg">Still need help?</h2>
        <p className="text-muted text-sm mt-1">{BRAND.phone} · {BRAND.email}</p>
        <p className="text-muted text-sm">{BRAND.address}</p>
        <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
          <IconWhatsApp /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
