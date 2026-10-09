import type { Metadata } from "next";
import Link from "next/link";
import { IconWhatsApp } from "@/components/Icons";
import { BRAND, FIXTURES, RESULTS, SQUAD, TEAM, getProduct } from "@/lib/data";

export const metadata: Metadata = {
  title: "Run Machine XI — Our Team",
  description: "Meet the Run Machine XI squad, see fixtures and results, and shop the gear each player uses.",
};

const ROLE_COLOR: Record<string, string> = {
  Batter: "bg-brand/15 text-brand",
  Bowler: "bg-[#1c6bff]/15 text-[#7aa7ff]",
  "All-rounder": "bg-lime/15 text-lime",
  "Wicket-keeper": "bg-gold/15 text-gold",
};

export default function TeamPage() {
  const winPct = Math.round((TEAM.record.won / TEAM.record.played) * 100);
  const trialsLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi, I'd like to register for Run Machine XI trials.\nName:\nAge:\nRole (bat/bowl/all-round/keeper):")}`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(50%_90%_at_15%_10%,rgba(255,77,28,.25),transparent_70%)]" />
        <div className="wrap relative py-12 md:py-20">
          <p className="eyebrow">Est. {TEAM.founded} · {TEAM.home}</p>
          <h1 className="display text-[18vw] sm:text-8xl lg:text-[130px] mt-3">{TEAM.name}</h1>
          <p className="text-muted text-lg mt-5 max-w-xl">
            The team behind the brand. Every product we sell is played in a match by these players before it goes on the shelf.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-9 max-w-3xl">
            {[...Object.entries(TEAM.record), ["win %", winPct]].map(([k, v]) => (
              <div key={k} className="card p-4 text-center">
                <p className="display text-4xl">{v}</p>
                <p className="text-[11px] uppercase tracking-wider text-muted mt-1">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pt-14">
        <p className="eyebrow">Squad 2026</p>
        <h2 className="display text-4xl md:text-5xl mt-2 mb-6">The players</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SQUAD.map((pl) => {
            const gear = getProduct(pl.gearId);
            return (
              <article key={pl.no} className="card p-5 relative overflow-hidden flex flex-col">
                <span className="display absolute -top-3 right-2 text-[92px] text-white/[.06] select-none" aria-hidden>{pl.no}</span>
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-full bg-panel-2 border border-line grid place-items-center display text-lg">
                    {pl.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <h3 className="font-bold leading-tight">
                      {pl.name} {pl.captain && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold text-ink align-middle">C</span>}
                    </h3>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ROLE_COLOR[pl.role]}`}>{pl.role}</span>
                  </div>
                </div>
                <p className="text-sm text-muted mt-4">{pl.style}</p>
                <p className="text-sm font-semibold mt-1">{pl.stat}</p>
                {gear && (
                  <Link href={`/product/${gear.slug}/`} className="mt-auto pt-4 text-xs text-muted hover:text-brand">
                    Plays with: <span className="underline">{gear.name}</span>
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="wrap pt-14 grid lg:grid-cols-2 gap-6">
        <div>
          <p className="eyebrow">Upcoming</p>
          <h2 className="display text-4xl mt-2 mb-5">Fixtures</h2>
          <ul className="space-y-3">
            {FIXTURES.map((f) => (
              <li key={f.date} className="card p-5 flex gap-4 items-center">
                <div className="text-center shrink-0 w-16">
                  <p className="display text-3xl">{f.date.split(" ")[0]}</p>
                  <p className="text-[11px] uppercase text-muted">{f.date.split(" ")[1]}</p>
                </div>
                <div className="border-l border-line pl-4">
                  <p className="font-bold">vs {f.vs}</p>
                  <p className="text-sm text-muted">{f.comp}</p>
                  <p className="text-xs text-muted mt-1">{f.time} · {f.venue}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Recent</p>
          <h2 className="display text-4xl mt-2 mb-5">Results</h2>
          <ul className="space-y-3">
            {RESULTS.map((r) => (
              <li key={r.date} className="card p-5">
                <div className="flex justify-between gap-3 text-xs text-muted">
                  <span>{r.date}</span>
                  <span className={`font-bold px-2 py-0.5 rounded ${r.won ? "bg-ok/15 text-ok" : "bg-brand/15 text-brand"}`}>{r.result}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 mt-3 text-sm">
                  <span className="font-bold">Run Machine XI</span><span className="font-semibold">{r.us}</span>
                  <span className="text-muted">{r.vs}</span><span className="text-muted">{r.them}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap pt-14">
        <div className="rounded-2xl bg-brand text-white p-7 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="display text-4xl md:text-6xl">Think you can make the XI?</h2>
            <p className="mt-3 text-white/85 max-w-xl">Open trials every season for U-16, U-19 and senior players. Send your details and a clip — our coaches will get back.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a href={trialsLink} target="_blank" rel="noopener noreferrer" className="btn btn-light"><IconWhatsApp /> Register for trials</a>
            <Link href="/reels/#share" className="btn border border-white/50">Share your clip</Link>
          </div>
        </div>
        <p className="text-xs text-muted mt-4">Squad names, stats, fixtures and results on this page are placeholder data for the demo.</p>
      </section>
    </>
  );
}
