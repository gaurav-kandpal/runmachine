"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/lib/data";

type Answers = { ball?: "leather" | "tennis"; height?: string; style?: "power" | "touch" | "allround"; budget?: number };

const HEIGHTS = [
  { v: "Size 4", label: "Under 4'9\"", sub: "approx. 8–10 yrs" },
  { v: "Size 5", label: "4'9\" – 5'0\"", sub: "approx. 10–12 yrs" },
  { v: "Size 6", label: "5'0\" – 5'3\"", sub: "approx. 12–13 yrs" },
  { v: "Harrow", label: "5'3\" – 5'6\"", sub: "approx. 13–15 yrs" },
  { v: "SH", label: "5'6\" – 6'2\"", sub: "Short Handle (most adults)" },
  { v: "LH", label: "Above 6'2\"", sub: "Long Handle" },
];

const STEPS = ["Ball", "Height", "Style", "Budget"];

function recommend(a: Answers): { picks: Product[]; size: string; why: string } {
  const cat = a.ball === "tennis" ? "tennis-bats" : "leather-bats";
  const size = a.ball === "tennis" ? "Full Size" : a.height!;
  const sweet = a.style === "power" ? "low" : a.style === "touch" ? "mid" : "";
  const scored = PRODUCTS.filter((p) => p.category === cat)
    .map((p) => {
      let score = 0;
      if (p.price <= a.budget!) score += 4;
      else score -= (p.price - a.budget!) / 1000;
      if (p.sizes.includes(size)) score += 3;
      if (sweet && p.specs["Sweet spot"]?.toLowerCase().includes(sweet)) score += 1.5;
      // Within budget, prefer the better bat.
      if (p.price <= a.budget!) score += p.price / 10000;
      return { p, score };
    })
    .sort((x, y) => y.score - x.score);
  const why =
    a.style === "power"
      ? "A lower sweet spot and thicker edges help you hit through the line."
      : a.style === "touch"
        ? "A mid sweet spot with light pick-up suits timing and placement."
        : "A balanced all-round profile that works for every phase of the innings.";
  return { picks: scored.slice(0, 3).map((s) => s.p), size, why };
}

export default function BatFinderPage() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});

  const choose = (patch: Answers) => {
    const next = { ...a, ...patch };
    setA(next);
    // Tennis bats are one size, so the height question is skipped.
    setStep(step === 0 && next.ball === "tennis" ? 2 : step + 1);
  };
  const back = () => setStep(step === 2 && a.ball === "tennis" ? 0 : step - 1);
  const done = step >= 4;
  const result = done ? recommend(a) : null;

  return (
    <div className="wrap py-8 md:py-12 max-w-4xl">
      <p className="eyebrow">Bat Finder</p>
      <h1 className="display text-5xl md:text-6xl mt-2">{done ? "Your match" : "Find your bat"}</h1>

      {!done && (
        <>
          <div className="flex gap-2 mt-6" aria-label={`Step ${step + 1} of 4`}>
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-line"}`} />
                <p className={`text-xs mt-1.5 ${i === step ? "text-fg font-semibold" : "text-muted"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="card p-6 md:p-8 mt-6 rise" key={step}>
            {step === 0 && (
              <Q title="Which ball do you play with?">
                <Opt onClick={() => choose({ ball: "leather" })} label="Leather ball" sub="Academy, club & league cricket" />
                <Opt onClick={() => choose({ ball: "tennis" })} label="Tennis ball" sub="Box cricket, gully & night tournaments" />
              </Q>
            )}
            {step === 1 && (
              <Q title="How tall is the player?">
                {HEIGHTS.map((h) => <Opt key={h.v} onClick={() => choose({ height: h.v })} label={h.label} sub={`${h.sub} → ${h.v}`} />)}
              </Q>
            )}
            {step === 2 && (
              <Q title="How do you like to bat?">
                <Opt onClick={() => choose({ style: "power" })} label="Power hitter" sub="Clear the ropes, front-foot dominant" />
                <Opt onClick={() => choose({ style: "touch" })} label="Timer / stroke player" sub="Gaps, placement and back-foot play" />
                <Opt onClick={() => choose({ style: "allround" })} label="All-round" sub="A bit of everything" />
              </Q>
            )}
            {step === 3 && (
              <Q title="What's your budget?">
                {[[2500, "Under ₹2,500"], [5000, "Up to ₹5,000"], [8000, "Up to ₹8,000"], [25000, "No limit — show me the best"]].map(([v, l]) => (
                  <Opt key={v} onClick={() => choose({ budget: v as number })} label={l as string} />
                ))}
              </Q>
            )}
            {step > 0 && <button className="text-sm text-muted underline mt-6" onClick={back}>← Back</button>}
          </div>
        </>
      )}

      {result && (
        <div className="rise">
          <div className="card p-6 mt-6 grid sm:grid-cols-[auto_1fr] gap-5 items-center">
            <div className="text-center px-4">
              <p className="label !mb-1">Your size</p>
              <p className="display text-5xl text-brand">{result.size}</p>
            </div>
            <p className="text-muted">{result.why} Top pick is first; the other two are close alternatives{result.picks.some((p) => p.price > a.budget!) ? " (some are slightly above your budget)" : ""}.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-6">
            {result.picks.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <div className="flex gap-3 mt-8">
            <button className="btn btn-ghost" onClick={() => { setA({}); setStep(0); }}>Start again</button>
            <Link href="/shop/" className="btn btn-primary">Browse all gear</Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Q({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-2xl font-bold">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-3 mt-5">{children}</div>
    </fieldset>
  );
}

function Opt({ label, sub, onClick }: { label: string; sub?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-left rounded-xl border border-line p-4 hover:border-brand hover:bg-brand/10 transition-colors">
      <span className="font-semibold block">{label}</span>
      {sub && <span className="text-sm text-muted">{sub}</span>}
    </button>
  );
}
