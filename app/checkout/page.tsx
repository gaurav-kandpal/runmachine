"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconCash, IconCheck } from "@/components/Icons";
import OrderSummary from "@/components/OrderSummary";
import { SHIPPING, checkPincode, getProduct, inr } from "@/lib/data";
import { Address, useStore } from "@/lib/store";

const STATES = ["Delhi", "Uttar Pradesh", "Haryana", "Rajasthan", "Punjab", "Uttarakhand", "Maharashtra", "Gujarat", "Madhya Pradesh", "Bihar", "West Bengal", "Karnataka", "Tamil Nadu", "Telangana", "Kerala", "Other"];

const EMPTY: Address = { name: "", phone: "", email: "", line1: "", city: "", state: "", pincode: "" };

function validate(a: Address) {
  const e: Partial<Record<keyof Address, string>> = {};
  if (a.name.trim().length < 3) e.name = "Enter your full name";
  if (!/^[6-9]\d{9}$/.test(a.phone)) e.phone = "Enter a valid 10-digit mobile number";
  if (a.email && !/^\S+@\S+\.\S+$/.test(a.email)) e.email = "Enter a valid email or leave it blank";
  if (a.line1.trim().length < 8) e.line1 = "Enter house no., street and landmark";
  if (a.city.trim().length < 2) e.city = "Enter your city";
  if (!a.state) e.state = "Select your state";
  if (!checkPincode(a.pincode)) e.pincode = "Enter a valid 6-digit pincode";
  return e;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, ready, totals, placeOrder } = useStore();
  const [a, setA] = useState<Address>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [agree, setAgree] = useState(true);
  const [placing, setPlacing] = useState(false);

  if (!ready) return <div className="wrap py-20 text-muted">Loading checkout…</div>;

  if (cart.length === 0 && !placing)
    return (
      <div className="wrap py-20 text-center">
        <h1 className="display text-5xl">Nothing to check out</h1>
        <Link href="/shop/" className="btn btn-primary mt-7">Go to shop</Link>
      </div>
    );

  const eta = checkPincode(a.pincode);
  const field = (k: keyof Address) => ({
    id: k,
    value: a[k],
    "aria-invalid": !!errors[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const v = k === "phone" || k === "pincode" ? e.target.value.replace(/\D/g, "") : e.target.value;
      setA((s) => ({ ...s, [k]: v }));
      if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(a);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    if (!totals.codAllowed) return;
    setPlacing(true);
    const order = placeOrder(a);
    router.push(`/order-success/?id=${order.id}`);
  };

  return (
    <div className="wrap py-8 md:py-12">
      <h1 className="display text-5xl">Checkout</h1>
      <ol className="flex gap-2 text-xs font-semibold mt-4 text-muted">
        <li className="text-ok">Cart ✓</li><li>—</li><li className="text-fg">Address & payment</li><li>—</li><li>Done</li>
      </ol>

      <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-8 mt-8">
        <div className="space-y-5">
          <section className="card p-5 md:p-6">
            <h2 className="font-bold text-lg">1. Delivery address</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <F label="Full name" error={errors.name} k="name"><input className="input" autoComplete="name" {...field("name")} /></F>
              <F label="Mobile number" error={errors.phone} k="phone">
                <input className="input" inputMode="numeric" maxLength={10} autoComplete="tel-national" placeholder="10-digit number" {...field("phone")} />
              </F>
              <F label="Email (optional)" error={errors.email} k="email" wide><input className="input" type="email" autoComplete="email" {...field("email")} /></F>
              <F label="Address" error={errors.line1} k="line1" wide>
                <textarea className="input" rows={2} autoComplete="street-address" placeholder="House no., street, landmark" {...field("line1")} />
              </F>
              <F label="Pincode" error={errors.pincode} k="pincode"><input className="input" inputMode="numeric" maxLength={6} autoComplete="postal-code" {...field("pincode")} /></F>
              <F label="City" error={errors.city} k="city"><input className="input" autoComplete="address-level2" {...field("city")} /></F>
              <F label="State" error={errors.state} k="state" wide>
                <select className="input" autoComplete="address-level1" {...field("state")}>
                  <option value="">Select state</option>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </F>
            </div>
            {eta && (
              <p className="text-sm text-ok mt-4 flex items-center gap-2">
                <IconCheck className="w-4 h-4" /> Estimated delivery by <b>{eta.by}</b> · COD serviceable
              </p>
            )}
          </section>

          <section className="card p-5 md:p-6">
            <h2 className="font-bold text-lg">2. Payment method</h2>
            <div className="mt-5 space-y-3">
              <label className={`flex items-start gap-3 rounded-xl border p-4 ${totals.codAllowed ? "border-brand bg-brand/10" : "border-line opacity-60"}`}>
                <input type="radio" name="pay" defaultChecked disabled={!totals.codAllowed} className="mt-1 accent-[#ff4d1c]" />
                <span className="flex-1">
                  <span className="font-semibold flex items-center gap-2"><IconCash className="w-5 h-5" /> Cash on Delivery</span>
                  <span className="text-sm text-muted block mt-1">
                    {totals.codAllowed
                      ? `Pay ${inr(totals.total)} in cash or UPI to the delivery partner. Includes ${inr(SHIPPING.codFee)} COD handling.`
                      : `COD is available on orders up to ${inr(SHIPPING.codLimit)}. Please reduce the cart or contact us on WhatsApp.`}
                  </span>
                </span>
              </label>
              {["UPI / QR", "Credit & debit card", "Net banking"].map((m) => (
                <label key={m} className="flex items-center gap-3 rounded-xl border border-line p-4 opacity-50">
                  <input type="radio" name="pay" disabled />
                  <span className="font-semibold">{m}</span>
                  <span className="ml-auto text-[11px] font-bold px-2 py-1 rounded border border-line">Coming soon</span>
                </label>
              ))}
            </div>
          </section>

          <section className="card p-5 md:p-6">
            <h2 className="font-bold text-lg">3. Items ({cart.length})</h2>
            <ul className="mt-4 divide-y divide-line text-sm">
              {cart.map((i) => {
                const p = getProduct(i.id);
                return p && (
                  <li key={i.id + i.size} className="py-3 flex justify-between gap-4">
                    <span>{p.name} <span className="text-muted">· {i.size} × {i.qty}</span></span>
                    <span className="font-semibold">{inr(p.price * i.qty)}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <OrderSummary>
          <label className="flex gap-2.5 text-xs text-muted mt-5">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-[#ff4d1c] mt-0.5" />
            <span>I will be available to receive the order and pay on delivery. I agree to the <Link href="/help/" className="underline">shipping & return policy</Link>.</span>
          </label>
          <button className="btn btn-primary w-full mt-4" disabled={!agree || !totals.codAllowed || placing}>
            {placing ? "Placing order…" : `Place COD order · ${inr(totals.total)}`}
          </button>
          <p className="text-xs text-muted text-center mt-3">Our team calls to confirm every COD order before dispatch.</p>
        </OrderSummary>
      </form>
    </div>
  );
}

function F({ label, error, k, wide, children }: { label: string; error?: string; k: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="label" htmlFor={k}>{label}</label>
      {children}
      {error && <p className="text-sm text-brand mt-1.5" role="alert">{error}</p>}
    </div>
  );
}
