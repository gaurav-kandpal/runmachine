"use client";

import Link from "next/link";
import { IconTrash } from "@/components/Icons";
import OrderSummary from "@/components/OrderSummary";
import ProductImage from "@/components/ProductImage";
import { getProduct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function CartPage() {
  const { cart, ready, setQty, removeFromCart, totals } = useStore();

  if (!ready) return <div className="wrap py-20 text-muted">Loading cart…</div>;

  if (cart.length === 0)
    return (
      <div className="wrap py-20 text-center">
        <h1 className="display text-5xl">Your cart is empty</h1>
        <p className="text-muted mt-3">Time to pad up. Pick your gear and we&apos;ll get it to your door.</p>
        <Link href="/shop/" className="btn btn-primary mt-7">Start shopping</Link>
      </div>
    );

  return (
    <div className="wrap py-8 md:py-12">
      <h1 className="display text-5xl">Your cart</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8 mt-8">
        <ul className="space-y-3">
          {cart.map((i) => {
            const p = getProduct(i.id);
            if (!p) return null;
            return (
              <li key={i.id + i.size} className="card p-3 md:p-4 flex gap-4">
                <Link href={`/product/${p.slug}/`} className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0">
                  <ProductImage p={p} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <Link href={`/product/${p.slug}/`} className="font-semibold leading-snug hover:text-brand line-clamp-2">{p.name}</Link>
                  <p className="text-sm text-muted mt-0.5">Size: {i.size}</p>
                  <div className="flex items-center justify-between gap-3 mt-auto pt-2">
                    <div className="flex items-center border border-line rounded-lg h-9">
                      <button className="w-9 h-full" onClick={() => setQty(i.id, i.size, i.qty - 1)} disabled={i.qty <= 1} aria-label="Decrease quantity">−</button>
                      <span className="w-7 text-center text-sm font-semibold">{i.qty}</span>
                      <button className="w-9 h-full" onClick={() => setQty(i.id, i.size, i.qty + 1)} disabled={i.qty >= Math.min(10, p.stock)} aria-label="Increase quantity">+</button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{inr(p.price * i.qty)}</p>
                      <p className="text-xs text-muted line-through">{inr(p.mrp * i.qty)}</p>
                    </div>
                  </div>
                </div>
                <button className="self-start p-1.5 text-muted hover:text-brand" onClick={() => removeFromCart(i.id, i.size)} aria-label={`Remove ${p.name}`}>
                  <IconTrash className="w-5 h-5" />
                </button>
              </li>
            );
          })}
        </ul>

        <OrderSummary>
          <Link href="/checkout/" className="btn btn-primary w-full mt-5">Proceed to checkout</Link>
          <p className="text-xs text-muted text-center mt-3">
            {totals.codAllowed ? "Cash on Delivery · no advance payment" : "Order value above COD limit — see checkout"}
          </p>
        </OrderSummary>
      </div>
    </div>
  );
}
