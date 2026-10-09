"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { PRODUCTS, categoryName, discountPct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ComparePage() {
  const { compare, ready, toggleCompare } = useStore();
  if (!ready) return <div className="wrap py-20 text-muted">Loading…</div>;
  const list = PRODUCTS.filter((p) => compare.includes(p.id));
  const specKeys = [...new Set(list.flatMap((p) => Object.keys(p.specs)))];

  const rows: [string, (p: (typeof list)[0]) => string][] = [
    ["Price", (p) => inr(p.price)],
    ["MRP", (p) => inr(p.mrp)],
    ["Discount", (p) => `${discountPct(p)}%`],
    ["Category", (p) => categoryName(p.category)],
    ["Level", (p) => p.level],
    ["Rating", (p) => `${p.rating} ★ (${p.reviewCount})`],
    ["Sizes", (p) => p.sizes.join(", ")],
    ...specKeys.map((k): [string, (p: (typeof list)[0]) => string] => [k, (p) => p.specs[k] ?? "—"]),
  ];

  return (
    <div className="wrap py-8 md:py-12">
      <h1 className="display text-5xl">Compare</h1>
      <p className="text-muted mt-2 text-sm">Add up to 3 products using the compare button on any product.</p>

      {list.length === 0 ? (
        <div className="card p-10 text-center mt-8">
          <p className="display text-3xl">Nothing to compare</p>
          <Link href="/shop/" className="btn btn-primary mt-6">Pick products</Link>
        </div>
      ) : (
        <div className="overflow-x-auto mt-8 card">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr>
                <th className="w-32 p-4" />
                {list.map((p) => (
                  <th key={p.id} className="p-4 text-left align-top font-normal border-l border-line">
                    <Link href={`/product/${p.slug}/`} className="block w-28 h-28 rounded-xl overflow-hidden">
                      <ProductImage p={p} className="w-full h-full object-cover" />
                    </Link>
                    <Link href={`/product/${p.slug}/`} className="font-semibold block mt-3 hover:text-brand">{p.name}</Link>
                    <button className="text-xs text-muted underline mt-2" onClick={() => toggleCompare(p.id)}>Remove</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, get]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="p-4 text-left text-muted font-medium">{label}</th>
                  {list.map((p) => (
                    <td key={p.id} className="p-4 border-l border-line">{get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
