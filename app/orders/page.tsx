"use client";

import Link from "next/link";
import { inr } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function OrdersPage() {
  const { orders, ready } = useStore();
  if (!ready) return <div className="wrap py-20 text-muted">Loading orders…</div>;

  return (
    <div className="wrap py-8 md:py-12 max-w-3xl">
      <h1 className="display text-5xl">My orders</h1>
      <p className="text-muted mt-2 text-sm">Orders placed from this device. Accounts and order history sync arrive with the backend.</p>

      {orders.length === 0 ? (
        <div className="card p-10 text-center mt-8">
          <p className="display text-3xl">No orders yet</p>
          <Link href="/shop/" className="btn btn-primary mt-6">Start shopping</Link>
        </div>
      ) : (
        <ul className="space-y-3 mt-8">
          {orders.map((o) => (
            <li key={o.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-bold">{o.id}</p>
                  <p className="text-xs text-muted">
                    {new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {o.items.reduce((s, i) => s + i.qty, 0)} item(s) · COD
                  </p>
                </div>
                <p className="font-bold">{inr(o.total)}</p>
              </div>
              <p className="text-sm text-muted mt-3 line-clamp-1">{o.items.map((i) => i.name).join(", ")}</p>
              <Link href={`/track/?id=${o.id}`} className="btn btn-ghost btn-sm mt-4">Track order</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
