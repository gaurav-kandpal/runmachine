"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, categoryName, inr } from "@/lib/data";

const SORTS = [
  { v: "popular", label: "Most popular" },
  { v: "new", label: "New & featured" },
  { v: "low", label: "Price: low to high" },
  { v: "high", label: "Price: high to low" },
  { v: "rating", label: "Top rated" },
  { v: "discount", label: "Biggest discount" },
];
const LEVELS = ["Beginner", "Club", "Pro"];
const MAX_PRICE = 15000;

export default function ShopClient() {
  const params = useSearchParams();
  const router = useRouter();

  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "popular";
  const level = params.get("level") ?? "";
  const max = Number(params.get("max")) || MAX_PRICE;

  // Filters live in the URL so results can be shared and the back button works.
  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/shop/?${next.toString()}`, { scroll: false });
  };

  const list = useMemo(() => {
    const needle = q.toLowerCase();
    const out = PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!level || p.level === level) &&
        p.price <= max &&
        (!needle ||
          [p.name, p.short, categoryName(p.category), ...Object.values(p.specs)].join(" ").toLowerCase().includes(needle))
    );
    const by: Record<string, (a: (typeof out)[0], b: (typeof out)[0]) => number> = {
      popular: (a, b) => b.reviewCount - a.reviewCount,
      new: (a, b) => Number(!!b.badge && b.badge !== "Bestseller") - Number(!!a.badge && a.badge !== "Bestseller"),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp,
    };
    return out.sort(by[sort] ?? by.popular);
  }, [cat, q, sort, level, max]);

  const active = cat || q || level || max < MAX_PRICE;

  return (
    <div className="wrap py-8 md:py-12">
      <p className="eyebrow">Shop</p>
      <h1 className="display text-5xl md:text-6xl mt-2">{cat ? categoryName(cat) : q ? `“${q}”` : "All gear"}</h1>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-6 -mx-4 px-4 md:mx-0 md:px-0">
        <button className={`chip ${!cat ? "chip-on" : ""}`} onClick={() => set("cat", "")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.slug} className={`chip ${cat === c.slug ? "chip-on" : ""}`} onClick={() => set("cat", c.slug)}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[250px_1fr] gap-8 mt-8">
        <aside className="card p-5 h-fit lg:sticky lg:top-32 space-y-6">
          <div>
            <label className="label" htmlFor="search">Search</label>
            <input id="search" className="input" placeholder="e.g. English willow" defaultValue={q} key={q}
              onKeyDown={(e) => e.key === "Enter" && set("q", e.currentTarget.value.trim())}
              onBlur={(e) => e.currentTarget.value.trim() !== q && set("q", e.currentTarget.value.trim())} />
          </div>
          <div>
            <p className="label">Player level</p>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button key={l} className={`chip ${level === l ? "chip-on" : ""}`} onClick={() => set("level", level === l ? "" : l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="max">Max price: {max >= MAX_PRICE ? "Any" : inr(max)}</label>
            <input id="max" type="range" min={1000} max={MAX_PRICE} step={500} value={max}
              onChange={(e) => set("max", Number(e.target.value) >= MAX_PRICE ? "" : e.target.value)}
              className="w-full accent-[#ff4d1c]" />
          </div>
          {active && (
            <button className="btn btn-ghost btn-sm w-full" onClick={() => router.replace("/shop/", { scroll: false })}>
              Clear all filters
            </button>
          )}
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <p className="text-sm text-muted">{list.length} product{list.length === 1 ? "" : "s"}</p>
            <label className="flex items-center gap-2 text-sm text-muted">
              <span className="hidden sm:inline">Sort</span>
              <select className="input !h-10 !w-auto pr-8" value={sort} onChange={(e) => set("sort", e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.v} value={s.v}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {list.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="display text-3xl">No gear matches</p>
              <p className="text-muted mt-2">Try removing a filter or searching for something else.</p>
              <button className="btn btn-primary mt-6" onClick={() => router.replace("/shop/")}>Show everything</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
              {list.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
