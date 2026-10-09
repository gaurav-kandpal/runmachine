import { BRAND, inr } from "@/lib/data";
import type { Order } from "@/lib/store";
import { IconCheck } from "./Icons";

const STAGES = ["Order placed", "Confirmed on call", "Packed", "Shipped", "Out for delivery", "Delivered"];

/** Demo tracking: one stage per day since the order was placed. */
export function stageOf(order: Order) {
  const days = Math.floor((Date.now() - new Date(order.date).getTime()) / 86400000);
  return Math.min(STAGES.length - 1, days);
}

export function orderWhatsAppLink(o: Order) {
  const lines = [
    `New COD order ${o.id}`,
    ...o.items.map((i) => `• ${i.name} (${i.size}) × ${i.qty} — ${inr(i.price * i.qty)}`),
    `Total payable: ${inr(o.total)} (COD)`,
    `Name: ${o.address.name}`,
    `Phone: ${o.address.phone}`,
    `Address: ${o.address.line1}, ${o.address.city}, ${o.address.state} - ${o.address.pincode}`,
  ];
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function Timeline({ order }: { order: Order }) {
  const stage = stageOf(order);
  return (
    <ol className="space-y-0">
      {STAGES.map((s, i) => {
        const done = i <= stage;
        return (
          <li key={s} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={`w-7 h-7 rounded-full grid place-items-center border ${done ? "bg-ok border-ok text-ink" : "border-line text-muted"}`}>
                {done ? <IconCheck className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
              </span>
              {i < STAGES.length - 1 && <span className={`w-px flex-1 min-h-6 ${i < stage ? "bg-ok" : "bg-line"}`} />}
            </div>
            <p className={`pb-5 pt-0.5 text-sm ${done ? "font-semibold" : "text-muted"}`}>
              {s}
              {i === stage && i < STAGES.length - 1 && <span className="block text-xs font-normal text-muted">Current status</span>}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function OrderItems({ order }: { order: Order }) {
  return (
    <div className="text-sm">
      <ul className="divide-y divide-line">
        {order.items.map((i) => (
          <li key={i.id + i.size} className="py-2.5 flex justify-between gap-4">
            <span>{i.name} <span className="text-muted">· {i.size} × {i.qty}</span></span>
            <span className="font-semibold">{inr(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="border-t border-line pt-3 space-y-1.5">
        {order.discount > 0 && <div className="flex justify-between text-ok"><dt>Coupon {order.coupon}</dt><dd>−{inr(order.discount)}</dd></div>}
        <div className="flex justify-between text-muted"><dt>Shipping</dt><dd>{order.shipping ? inr(order.shipping) : "FREE"}</dd></div>
        <div className="flex justify-between text-muted"><dt>COD handling</dt><dd>{inr(order.codFee)}</dd></div>
        <div className="flex justify-between font-bold text-base pt-1"><dt>Pay on delivery</dt><dd>{inr(order.total)}</dd></div>
      </dl>
    </div>
  );
}
