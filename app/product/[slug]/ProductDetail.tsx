"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconCash, IconCheck, IconCompare, IconHeart, IconPin, IconReturn, IconShare, IconShield, IconTruck, IconWhatsApp, Stars } from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { BRAND, PRODUCTS, Product, REELS, SHIPPING, categoryName, checkPincode, discountPct, inr, reviewsFor } from "@/lib/data";
import { useStore } from "@/lib/store";

const VIEWS = ["Front", "Back", "Close-up", "Side"];

export default function ProductDetail({ p }: { p: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, notify } = useStore();
  const [view, setView] = useState(0);
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<ReturnType<typeof checkPincode> | "bad" | undefined>();
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  const wished = wishlist.includes(p.id);
  const compared = compare.includes(p.id);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const pairs = PRODUCTS.filter((x) => x.category !== p.category && x.level === p.level).slice(0, 4 - Math.min(related.length, 2));
  const reel = REELS.find((r) => r.productId === p.id);
  const reviews = reviewsFor(p);
  const codOk = p.price * qty <= SHIPPING.codLimit;

  const needSize = () => {
    if (size) return false;
    setSizeError(true);
    return true;
  };
  const add = () => !needSize() && addToCart(p.id, size, qty);
  const buyNow = () => {
    if (needSize()) return;
    addToCart(p.id, size, qty);
    router.push("/checkout/");
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: p.name, text: p.short, url });
      else {
        await navigator.clipboard.writeText(url);
        notify("Link copied");
      }
    } catch {}
  };

  const waText = encodeURIComponent(
    `Hi Run Machine, please share real-time photos/video of: ${p.name}${size ? ` (${size})` : ""}. Preferred weight: `
  );

  return (
    <div className="wrap py-6 md:py-10">
      <nav className="text-xs text-muted flex flex-wrap gap-1.5" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-fg">Home</Link>/
        <Link href={`/shop/?cat=${p.category}`} className="hover:text-fg">{categoryName(p.category)}</Link>/
        <span className="text-fg">{p.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mt-6">
        {/* Gallery */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="card overflow-hidden aspect-square relative">
            <ProductImage p={p} view={view} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 text-xs font-bold px-2.5 py-1 rounded bg-lime text-ink">Save {discountPct(p)}%</span>
            {p.badge && <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded bg-ink/80 border border-line">{p.badge}</span>}
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {VIEWS.map((label, i) => (
              <button key={label} onClick={() => setView(i)} aria-label={`${label} view`} aria-pressed={view === i}
                className={`rounded-xl overflow-hidden border aspect-square ${view === i ? "border-brand" : "border-line hover:border-muted"}`}>
                <ProductImage p={p} view={i} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <p className="eyebrow">{categoryName(p.category)} · {p.level}</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-2">{p.name}</h1>
          <button onClick={() => setTab("reviews")} className="flex items-center gap-2 mt-3 text-sm text-muted hover:text-fg">
            <Stars value={p.rating} /> <span className="font-semibold text-fg">{p.rating}</span> · {p.reviewCount} reviews
          </button>

          <div className="flex items-baseline flex-wrap gap-x-3 mt-5">
            <span className="text-4xl font-bold">{inr(p.price)}</span>
            <span className="text-lg text-muted line-through">{inr(p.mrp)}</span>
            <span className="text-sm font-bold text-lime">You save {inr(p.mrp - p.price)}</span>
          </div>
          <p className="text-xs text-muted mt-1">Inclusive of all taxes</p>
          <p className="text-muted mt-4">{p.short}</p>

          {p.sizes.length > 1 && (
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <p className="label !mb-0">Size {size && <span className="text-fg normal-case">· {size}</span>}</p>
                <Link href="/help/#size" className="text-xs text-muted underline">Size guide</Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => { setSize(s); setSizeError(false); }} aria-pressed={size === s}
                    className={`chip !h-10 ${size === s ? "chip-on" : ""}`}>
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="text-sm text-brand mt-2" role="alert">Please select a size first.</p>}
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-line rounded-[10px] h-[46px]">
              <button className="w-11 h-full text-xl" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">−</button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button className="w-11 h-full text-xl" onClick={() => setQty((n) => Math.min(Math.min(10, p.stock), n + 1))} aria-label="Increase quantity">+</button>
            </div>
            <p className={`text-sm font-semibold ${p.stock <= 6 ? "text-brand" : "text-ok"}`}>
              {p.stock <= 6 ? `Hurry — only ${p.stock} left` : "In stock, ready to ship"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="btn btn-ghost" onClick={add}>Add to cart</button>
            <button className="btn btn-primary" onClick={buyNow}>Buy now</button>
          </div>

          <div className="flex gap-2 mt-3">
            <button className={`btn btn-ghost btn-sm flex-1 ${wished ? "!text-brand" : ""}`} onClick={() => toggleWishlist(p.id)} aria-pressed={wished}>
              <IconHeart className="w-4 h-4" filled={wished} /> {wished ? "Saved" : "Wishlist"}
            </button>
            <button className={`btn btn-ghost btn-sm flex-1 ${compared ? "!text-lime" : ""}`} onClick={() => toggleCompare(p.id)} aria-pressed={compared}>
              <IconCompare className="w-4 h-4" /> Compare
            </button>
            <button className="btn btn-ghost btn-sm flex-1" onClick={share}>
              <IconShare className="w-4 h-4" /> Share
            </button>
          </div>

          {/* COD + pincode */}
          <div className="card p-5 mt-6">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-lg bg-ok/15 text-ok grid place-items-center shrink-0"><IconCash /></span>
              <div>
                <p className="font-semibold">{codOk ? "Cash on Delivery available" : "COD not available on this order value"}</p>
                <p className="text-sm text-muted">
                  {codOk ? `Pay at your doorstep. COD handling ${inr(SHIPPING.codFee)}.` : `COD is offered on orders up to ${inr(SHIPPING.codLimit)}.`}
                </p>
              </div>
            </div>
            <form className="flex gap-2 mt-4" onSubmit={(e) => { e.preventDefault(); setPinResult(checkPincode(pin) ?? "bad"); }}>
              <div className="relative flex-1">
                <IconPin className="w-4 h-4 absolute left-3.5 top-[15px] text-muted" />
                <input className="input !pl-10" inputMode="numeric" maxLength={6} placeholder="Enter delivery pincode" value={pin}
                  onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setPinResult(undefined); }} aria-label="Delivery pincode" />
              </div>
              <button className="btn btn-ghost">Check</button>
            </form>
            {pinResult === "bad" && <p className="text-sm text-brand mt-2" role="alert">Enter a valid 6-digit pincode.</p>}
            {pinResult && pinResult !== "bad" && (
              <p className="text-sm mt-3 flex items-center gap-2 text-ok">
                <IconCheck className="w-4 h-4" />
                <span>Delivery by <b>{pinResult.by}</b> ({pinResult.days[0]}–{pinResult.days[1]} days){pinResult.local ? " · Delhi NCR express" : ""} · COD available</span>
              </p>
            )}
          </div>

          {/* WhatsApp real-time photos */}
          <a href={`https://wa.me/${BRAND.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer"
            className="card p-5 mt-3 flex items-center gap-3 hover:border-[#25d366] transition-colors">
            <span className="w-10 h-10 rounded-lg bg-[#25d366]/15 text-[#25d366] grid place-items-center shrink-0"><IconWhatsApp /></span>
            <span>
              <span className="font-semibold block">Get real-time photos & video of your piece</span>
              <span className="text-sm text-muted">Tell us the weight, grains and ping you want — we&apos;ll send the exact item before dispatch.</span>
            </span>
          </a>

          {reel && (
            <Link href={`/reels/?v=${reel.id}`} className="card p-5 mt-3 flex items-center gap-3 hover:border-brand transition-colors">
              <span className="w-10 h-10 rounded-lg bg-brand/15 text-brand grid place-items-center shrink-0">▶</span>
              <span>
                <span className="font-semibold block">Watch it in action</span>
                <span className="text-sm text-muted">{reel.title}</span>
              </span>
            </Link>
          )}

          <div className="grid grid-cols-3 gap-3 mt-6 text-center text-xs text-muted">
            {[[IconTruck, `Free shipping above ${inr(SHIPPING.freeAbove)}`], [IconReturn, "7-day easy returns"], [IconShield, "100% genuine Run Machine"]].map(([Icon, t]) => {
              const I = Icon as typeof IconTruck;
              return (
                <div key={t as string} className="rounded-xl border border-line p-3">
                  <I className="w-5 h-5 mx-auto mb-1.5 text-fg" />
                  {t as string}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <section className="mt-14">
        <div className="flex gap-2 border-b border-line" role="tablist">
          {([["desc", "Description"], ["specs", "Specifications"], ["reviews", `Reviews (${p.reviewCount})`]] as const).map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px ${tab === k ? "border-brand text-fg" : "border-transparent text-muted hover:text-fg"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="py-7 max-w-3xl">
          {tab === "desc" && (
            <div>
              <p className="leading-relaxed text-muted">{p.description}</p>
              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <IconCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "specs" && (
            <dl className="card divide-y divide-line">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm">
                <dt className="text-muted">Origin</dt>
                <dd className="font-medium">Made in India</dd>
              </div>
            </dl>
          )}
          {tab === "reviews" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="display text-6xl">{p.rating}</span>
                <div>
                  <Stars value={p.rating} />
                  <p className="text-sm text-muted mt-1">Based on {p.reviewCount} reviews</p>
                </div>
              </div>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.name} className="card p-5">
                    <div className="flex items-center justify-between">
                      <Stars value={r.stars} />
                      <span className="text-xs text-ok font-semibold">Verified buyer</span>
                    </div>
                    <p className="mt-2">{r.text}</p>
                    <p className="text-sm text-muted mt-2">{r.name} · {r.city}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {[...related, ...pairs].length > 0 && (
        <section className="mt-8">
          <h2 className="display text-4xl mb-6">Players also bought</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[...related, ...pairs].slice(0, 4).map((x) => (
              <ProductCard key={x.id} p={x} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile buy bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-panel border-t border-line p-3 pr-20 flex items-center gap-3">
        <div className="leading-tight">
          <p className="font-bold">{inr(p.price)}</p>
          <p className="text-[11px] text-ok">COD available</p>
        </div>
        <button className="btn btn-primary flex-1" onClick={buyNow}>Buy now</button>
      </div>
    </div>
  );
}
