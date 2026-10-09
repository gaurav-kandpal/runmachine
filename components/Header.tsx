"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, CATEGORIES, SHIPPING, inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import { IconCart, IconClose, IconHeart, IconMenu, IconSearch } from "./Icons";
import Logo from "./Logo";

const NAV = [
  { href: "/shop/", label: "Shop" },
  { href: "/shop/?cat=leather-bats", label: "Bats" },
  { href: "/reels/", label: "Reels" },
  { href: "/team/", label: "Our Team" },
  { href: "/bat-finder/", label: "Bat Finder" },
  { href: "/track/", label: "Track Order" },
];

const TICKER = [
  `Cash on Delivery available across India`,
  `Free shipping above ${inr(SHIPPING.freeAbove)}`,
  `Use code RUN10 for 10% off`,
  `Real-time bat video on WhatsApp before dispatch`,
  `Official gear of Run Machine XI`,
];

export default function Header() {
  const { cartCount, wishlist, ready } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setOpen(false), [pathname]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/shop/?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand text-white text-xs font-semibold overflow-hidden">
        <div className="flex w-max marquee py-2">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="px-8 whitespace-nowrap">
              ● {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-ink/90 backdrop-blur border-b border-line">
        <div className="wrap flex items-center gap-4 h-16">
          <button className="lg:hidden -ml-1 p-1" onClick={() => setOpen(true)} aria-label="Open menu">
            <IconMenu className="w-6 h-6" />
          </button>

          <Link href="/" aria-label={`${BRAND.full} home`}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-6 text-sm font-semibold">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} className="text-muted hover:text-fg transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={search} className="hidden md:flex ml-auto relative w-64">
            <input
              className="input !h-10 !pl-10"
              placeholder="Search bats, gloves, pads…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search products"
            />
            <IconSearch className="w-4 h-4 absolute left-3.5 top-3 text-muted" />
          </form>

          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <Link href="/wishlist/" className="relative p-2 hover:text-brand" aria-label="Wishlist">
              <IconHeart className="w-6 h-6" />
              {ready && wishlist.length > 0 && <Count n={wishlist.length} />}
            </Link>
            <Link href="/cart/" className="relative p-2 hover:text-brand" aria-label="Cart">
              <IconCart className="w-6 h-6" />
              {ready && cartCount > 0 && <Count n={cartCount} />}
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[84%] max-w-sm bg-panel border-r border-line p-5 overflow-y-auto rise">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-1">
                <IconClose className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={search} className="relative mb-6">
              <input className="input !pl-10" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
              <IconSearch className="w-4 h-4 absolute left-3.5 top-4 text-muted" />
            </form>
            <div className="flex flex-col text-lg font-semibold">
              {NAV.map((n) => (
                <Link key={n.label} href={n.href} className="py-3 border-b border-line">
                  {n.label}
                </Link>
              ))}
              <Link href="/orders/" className="py-3 border-b border-line">My Orders</Link>
              <Link href="/compare/" className="py-3 border-b border-line">Compare</Link>
            </div>
            <p className="label mt-7">Categories</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/shop/?cat=${c.slug}`} className="chip">
                  {c.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

function Count({ n }: { n: number }) {
  return (
    <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[11px] font-bold grid place-items-center">
      {n}
    </span>
  );
}
