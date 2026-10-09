import Link from "next/link";
import { IconCash, IconInstagram, IconReturn, IconShield, IconTruck, Stars } from "@/components/Icons";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import ReelPoster from "@/components/ReelPoster";
import { BRAND, CATEGORIES, FIXTURES, PRODUCTS, REELS, SHIPPING, TEAM, inr } from "@/lib/data";

const TRUST = [
  { icon: IconCash, title: "Cash on Delivery", text: "Pay when it reaches your door" },
  { icon: IconTruck, title: "Fast dispatch", text: `Free shipping above ${inr(SHIPPING.freeAbove)}` },
  { icon: IconShield, title: "Team-tested gear", text: "Used by Run Machine XI" },
  { icon: IconReturn, title: "7-day easy returns", text: "Unused gear, no questions" },
];

const TESTIMONIALS = [
  { name: "Aman S.", city: "Delhi", text: "Asked for a 1170 g piece on WhatsApp, got a video of the exact bat before dispatch. Paid cash on delivery. Simple." },
  { name: "Academy coach", city: "East Delhi", text: "Half my U-14 batch is on Run Machine junior bats now. Right weights for the age group." },
  { name: "Sahil M.", city: "Lucknow", text: "Double Blade Rapid is a monster in tennis tournaments. Low sweet spot, clean pick-up." },
];

export default function Home() {
  const best = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const teamPicks = PRODUCTS.filter((p) => p.badge === "Team Pick" || p.badge === "New" || p.badge === "Limited").slice(0, 4);
  const next = FIXTURES[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(255,77,28,.28),transparent_70%)]" />
        <div className="wrap relative grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-center py-12 md:py-20">
          <div>
            <p className="eyebrow">Official gear of {TEAM.name}</p>
            <h1 className="display text-[15vw] sm:text-7xl lg:text-[104px] mt-4">
              Built for the <span className="text-brand">young</span> run machine.
            </h1>
            <p className="text-muted text-lg mt-6 max-w-lg">
              Bats, gloves and protection picked, weighed and match-tested by our own squad — delivered to your door with Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/shop/" className="btn btn-primary">Shop all gear</Link>
              <Link href="/bat-finder/" className="btn btn-ghost">Find my bat in 30 sec</Link>
            </div>
            <dl className="flex gap-8 mt-10 text-sm">
              {[
                ["6.9K+", "Instagram family"],
                [`${TEAM.record.won}/${TEAM.record.played}`, "Team wins"],
                ["4.7★", "Avg. rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="display text-3xl">{v}</dt>
                  <dd className="text-muted mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-square max-w-[520px] w-full mx-auto">
            <div className="absolute inset-[8%] rounded-full bg-brand/20 blur-3xl" />
            <ProductArt kind="bat" primary="#ff4d1c" accent="#111418" plain className="relative w-full h-full floaty drop-shadow-[0_30px_40px_rgba(0,0,0,.6)]" />
            <Link href={`/product/${PRODUCTS[0].slug}/`} className="absolute bottom-4 left-0 card px-4 py-3 text-sm hover:border-brand">
              <span className="text-muted text-xs">Players Edition</span>
              <span className="block font-bold">{inr(PRODUCTS[0].price)} <span className="text-muted line-through font-normal text-xs">{inr(PRODUCTS[0].mrp)}</span></span>
            </Link>
            <div className="absolute top-6 right-0 card px-4 py-3 text-sm">
              <Stars value={5} />
              <span className="block text-xs text-muted mt-1">“Ping is unreal”</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-line bg-panel">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4 gap-y-6 py-7">
          {TRUST.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-brand/15 text-brand grid place-items-center shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="wrap pt-16">
        <SectionHead eyebrow="Shop by category" title="Pick your gear" href="/shop/" cta="View all" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((c, i) => (
            <Link key={c.slug} href={`/shop/?cat=${c.slug}`} className="card overflow-hidden group relative aspect-[4/3] hover:border-brand transition-colors">
              <ProductArt kind={c.art} primary={["#ff4d1c", "#1c6bff", "#16a34a", "#ffc53d"][i % 4]} accent="#111418" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="display text-xl md:text-2xl">{c.name}</p>
                <p className="text-xs text-muted mt-1">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="wrap pt-16">
        <SectionHead eyebrow="Most ordered" title="Bestsellers" href="/shop/?sort=popular" cta="Shop bestsellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {best.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Team banner */}
      <section className="wrap pt-16">
        <div className="card overflow-hidden grid lg:grid-cols-2 bg-[linear-gradient(120deg,#1a2027,#13171c)]">
          <div className="p-7 md:p-12">
            <p className="eyebrow">Our team</p>
            <h2 className="display text-5xl md:text-6xl mt-3">{TEAM.name}</h2>
            <p className="text-muted mt-4 max-w-md">
              We don&apos;t just sell cricket gear — we play with it every weekend. Meet the squad, follow fixtures and shop exactly what each player uses.
            </p>
            <div className="grid grid-cols-4 gap-3 mt-7 max-w-md">
              {Object.entries(TEAM.record).map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line p-3 text-center">
                  <p className="display text-3xl">{v}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted mt-1">{k}</p>
                </div>
              ))}
            </div>
            <Link href="/team/" className="btn btn-light mt-8">Meet the squad</Link>
          </div>
          <div className="p-7 md:p-12 border-t lg:border-t-0 lg:border-l border-line flex flex-col justify-center">
            <p className="label">Next match</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="display text-3xl md:text-4xl">RM XI</span>
              <span className="text-brand font-bold">VS</span>
              <span className="display text-3xl md:text-4xl">{next.vs}</span>
            </div>
            <p className="text-muted mt-4 text-sm">{next.comp}</p>
            <p className="mt-1 font-semibold">{next.date} · {next.time}</p>
            <p className="text-muted text-sm">{next.venue}</p>
          </div>
        </div>
      </section>

      {/* Reels */}
      <section className="pt-16">
        <div className="wrap">
          <SectionHead eyebrow="Watch & share" title="Reels from the nets" href="/reels/" cta="All videos" />
        </div>
        <div className="wrap !pr-0 md:!pr-7">
          <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pr-4 snap-x">
            {REELS.slice(0, 6).map((r) => (
              <Link key={r.id} href={`/reels/?v=${r.id}`} className="w-[46%] sm:w-[30%] lg:w-[15.6%] shrink-0 snap-start">
                <ReelPoster reel={r} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team picks */}
      <section className="wrap pt-16">
        <SectionHead eyebrow="New & team picks" title="Fresh in the kit bag" href="/shop/?sort=new" cta="See what's new" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {teamPicks.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Bat finder CTA */}
      <section className="wrap pt-16">
        <div className="rounded-2xl bg-brand text-white p-7 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="display text-4xl md:text-6xl">Not sure which bat?</h2>
            <p className="mt-3 text-white/85 max-w-xl">
              Answer four quick questions — ball type, height, playing style and budget — and we&apos;ll match you with the right bat and size.
            </p>
          </div>
          <Link href="/bat-finder/" className="btn btn-light">Start Bat Finder</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="wrap pt-16">
        <SectionHead eyebrow="Happy customers" title="Straight from the dressing room" />
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card p-6">
              <Stars value={5} />
              <blockquote className="mt-3 leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-semibold text-fg">{t.name}</span> · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="wrap pt-16">
        <div className="card p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div>
            <p className="eyebrow">Follow the journey</p>
            <h2 className="display text-4xl mt-2">{BRAND.instagramHandle}</h2>
            <p className="text-muted mt-2">Match clips, new arrivals and customer stories — every week.</p>
          </div>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <IconInstagram className="w-5 h-5" /> Follow on Instagram
          </a>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display text-4xl md:text-5xl mt-2">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-muted hover:text-fg whitespace-nowrap">
          {cta} →
        </Link>
      )}
    </div>
  );
}
