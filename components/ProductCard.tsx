"use client";

import Link from "next/link";
import { Product, discountPct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";
import { IconCompare, IconHeart, IconStar } from "./Icons";
import ProductImage from "./ProductImage";

export default function ProductCard({ p }: { p: Product }) {
  const { wishlist, compare, toggleWishlist, toggleCompare, addToCart } = useStore();
  const wished = wishlist.includes(p.id);
  const compared = compare.includes(p.id);
  const single = p.sizes.length === 1;

  return (
    <article className="card overflow-hidden group flex flex-col">
      <div className="relative">
        <Link href={`/product/${p.slug}/`} className="block aspect-square overflow-hidden bg-panel-2">
          <ProductImage p={p} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-bold px-2 py-1 rounded bg-lime text-ink">-{discountPct(p)}%</span>
          {p.badge && <span className="text-[11px] font-bold px-2 py-1 rounded bg-ink/80 text-fg border border-line">{p.badge}</span>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => toggleWishlist(p.id)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className={`w-9 h-9 rounded-full grid place-items-center bg-ink/80 border border-line hover:border-fg ${wished ? "text-brand" : ""}`}
          >
            <IconHeart className="w-4 h-4" filled={wished} />
          </button>
          <button
            onClick={() => toggleCompare(p.id)}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            aria-pressed={compared}
            className={`w-9 h-9 rounded-full grid place-items-center bg-ink/80 border border-line hover:border-fg ${compared ? "text-lime" : ""}`}
          >
            <IconCompare className="w-4 h-4" />
          </button>
        </div>
        {p.stock <= 6 && (
          <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2 py-1 rounded bg-brand text-white">
            Only {p.stock} left
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span className="text-gold inline-flex"><IconStar className="w-3.5 h-3.5" /></span>
          <span className="font-semibold text-fg">{p.rating}</span>
          <span>({p.reviewCount})</span>
          <span className="ml-auto">{p.level}</span>
        </div>
        <Link href={`/product/${p.slug}/`} className="font-semibold leading-snug hover:text-brand line-clamp-2 min-h-[2.75em]">
          {p.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-bold">{inr(p.price)}</span>
          <span className="text-sm text-muted line-through">{inr(p.mrp)}</span>
        </div>
        {single ? (
          <button className="btn btn-primary btn-sm w-full" onClick={() => addToCart(p.id, p.sizes[0])}>
            Add to cart
          </button>
        ) : (
          <Link href={`/product/${p.slug}/`} className="btn btn-ghost btn-sm w-full">
            Select size
          </Link>
        )}
      </div>
    </article>
  );
}
