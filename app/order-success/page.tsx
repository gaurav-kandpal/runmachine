"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IconCheck, IconWhatsApp } from "@/components/Icons";
import { OrderItems, orderWhatsAppLink } from "@/components/OrderView";
import { useStore } from "@/lib/store";

function Success() {
  const id = useSearchParams().get("id");
  const { orders, ready } = useStore();
  if (!ready) return <div className="wrap py-20 text-muted">Loading…</div>;
  const order = orders.find((o) => o.id === id);

  if (!order)
    return (
      <div className="wrap py-20 text-center">
        <h1 className="display text-5xl">Order not found</h1>
        <p className="text-muted mt-3">We couldn&apos;t find that order on this device.</p>
        <Link href="/orders/" className="btn btn-primary mt-7">View my orders</Link>
      </div>
    );

  return (
    <div className="wrap py-10 md:py-16 max-w-2xl">
      <div className="text-center">
        <span className="w-16 h-16 rounded-full bg-ok text-ink grid place-items-center mx-auto rise">
          <IconCheck className="w-8 h-8" />
        </span>
        <h1 className="display text-5xl mt-5">Order placed!</h1>
        <p className="text-muted mt-3">
          Thanks {order.address.name.split(" ")[0]}. Your order <b className="text-fg">{order.id}</b> is booked as Cash on Delivery.
          We&apos;ll call <b className="text-fg">{order.address.phone}</b> to confirm before dispatch.
        </p>
      </div>

      <div className="card p-5 mt-8">
        <OrderItems order={order} />
        <p className="text-sm text-muted border-t border-line mt-4 pt-4">
          Delivering to: {order.address.line1}, {order.address.city}, {order.address.state} — {order.address.pincode}
        </p>
      </div>

      <a href={orderWhatsAppLink(order)} target="_blank" rel="noopener noreferrer" className="btn w-full mt-4 bg-[#25d366] text-white">
        <IconWhatsApp className="w-5 h-5" /> Confirm order on WhatsApp (faster dispatch)
      </a>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Link href={`/track/?id=${order.id}`} className="btn btn-ghost">Track order</Link>
        <Link href="/shop/" className="btn btn-ghost">Continue shopping</Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="wrap py-20 text-muted">Loading…</div>}>
      <Success />
    </Suspense>
  );
}
