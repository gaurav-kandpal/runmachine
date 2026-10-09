"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { IconWhatsApp } from "@/components/Icons";
import { OrderItems, Timeline, orderWhatsAppLink } from "@/components/OrderView";
import { useStore } from "@/lib/store";

function Track() {
  const id = (useSearchParams().get("id") ?? "").toUpperCase();
  const router = useRouter();
  const { orders, ready } = useStore();
  const [input, setInput] = useState(id);
  const order = orders.find((o) => o.id === id);

  return (
    <div className="wrap py-8 md:py-12 max-w-3xl">
      <h1 className="display text-5xl">Track order</h1>
      <form className="flex gap-2 mt-6" onSubmit={(e) => { e.preventDefault(); router.push(`/track/?id=${input.trim().toUpperCase()}`); }}>
        <input className="input uppercase" placeholder="Order ID, e.g. RMXXXXXXX" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Order ID" />
        <button className="btn btn-primary" disabled={!input.trim()}>Track</button>
      </form>

      {ready && id && !order && (
        <div className="card p-6 mt-6">
          <p className="font-semibold">No order found for “{id}” on this device.</p>
          <p className="text-sm text-muted mt-1">Check the ID, or see all orders placed from this browser.</p>
          <Link href="/orders/" className="btn btn-ghost btn-sm mt-4">My orders</Link>
        </div>
      )}

      {order && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="card p-5">
            <p className="label">Status · {order.id}</p>
            <div className="mt-3"><Timeline order={order} /></div>
            <p className="text-xs text-muted">Demo tracking — live courier updates connect with the backend.</p>
          </div>
          <div className="card p-5 h-fit">
            <p className="label">Order details</p>
            <OrderItems order={order} />
            <a href={orderWhatsAppLink(order)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm w-full mt-4">
              <IconWhatsApp className="w-4 h-4" /> Ask about this order
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="wrap py-20 text-muted">Loading…</div>}>
      <Track />
    </Suspense>
  );
}
