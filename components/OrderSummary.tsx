"use client";

import { useState } from "react";
import { COUPONS, SHIPPING, inr } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { totals, applyCoupon, removeCoupon, coupon } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const apply = (c: string) => {
    const err = applyCoupon(c);
    setError(err);
    if (!err) setCode("");
  };
  const toFree = SHIPPING.freeAbove - (totals.subtotal - totals.discount);

  return (
    <aside className="card p-5 h-fit lg:sticky lg:top-32">
      <h2 className="font-bold text-lg">Order summary</h2>

      {toFree > 0 && (
        <div className="mt-4">
          <p className="text-xs text-muted">Add {inr(toFree)} more for free shipping</p>
          <div className="h-1.5 rounded-full bg-line mt-2 overflow-hidden">
            <div className="h-full bg-brand" style={{ width: `${Math.max(6, 100 - (toFree / SHIPPING.freeAbove) * 100)}%` }} />
          </div>
        </div>
      )}

      <div className="mt-5">
        {totals.coupon ? (
          <div className="flex items-center justify-between rounded-lg border border-ok/40 bg-ok/10 px-3 py-2.5 text-sm">
            <span><b>{totals.coupon.code}</b> applied · {totals.coupon.label}</span>
            <button className="text-muted underline text-xs" onClick={removeCoupon}>Remove</button>
          </div>
        ) : (
          <>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); apply(code); }}>
              <input className="input uppercase" placeholder="Coupon code" value={code} onChange={(e) => { setCode(e.target.value); setError(null); }} aria-label="Coupon code" />
              <button className="btn btn-ghost" disabled={!code.trim()}>Apply</button>
            </form>
            {error && <p className="text-sm text-brand mt-2" role="alert">{error}</p>}
            {coupon && !totals.coupon && <p className="text-sm text-brand mt-2">{coupon} no longer applies to this cart.</p>}
            <div className="flex flex-wrap gap-2 mt-3">
              {COUPONS.map((c) => (
                <button key={c.code} className="chip !h-8 !text-xs" onClick={() => apply(c.code)} title={c.label}>
                  {c.code}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <dl className="mt-5 space-y-2.5 text-sm">
        <Row k="Subtotal" v={inr(totals.subtotal)} />
        {totals.mrpTotal > totals.subtotal && <Row k="You save on MRP" v={`−${inr(totals.mrpTotal - totals.subtotal)}`} good />}
        {totals.discount > 0 && <Row k={`Coupon (${totals.coupon?.code})`} v={`−${inr(totals.discount)}`} good />}
        <Row k="Shipping" v={totals.shipping ? inr(totals.shipping) : "FREE"} good={!totals.shipping} />
        <Row k="COD handling" v={inr(totals.codFee)} />
        <div className="border-t border-line pt-3 flex justify-between text-base font-bold">
          <dt>Total payable</dt>
          <dd>{inr(totals.total)}</dd>
        </div>
      </dl>

      {children}
    </aside>
  );
}

function Row({ k, v, good }: { k: string; v: string; good?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{k}</dt>
      <dd className={good ? "text-ok font-semibold" : ""}>{v}</dd>
    </div>
  );
}
