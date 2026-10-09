"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { COUPONS, Coupon, SHIPPING, getProduct } from "./data";

export type CartItem = { id: string; size: string; qty: number };

export type Address = {
  name: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  id: string;
  date: string;
  items: { id: string; name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  codFee: number;
  total: number;
  payment: "COD";
  coupon?: string;
  address: Address;
};

type Persisted = {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  orders: Order[];
  coupon: string | null;
};

const EMPTY: Persisted = { cart: [], wishlist: [], compare: [], orders: [], coupon: null };
const KEY = "runmachine-store-v1";

type Toast = { id: number; text: string; href?: string; cta?: string };

type Store = Persisted & {
  ready: boolean;
  toast: Toast | null;
  notify: (text: string, href?: string, cta?: string) => void;
  addToCart: (id: string, size: string, qty?: number) => void;
  setQty: (id: string, size: string, qty: number) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  applyCoupon: (code: string) => string | null;
  removeCoupon: () => void;
  placeOrder: (address: Address) => Order;
  totals: ReturnType<typeof computeTotals>;
  cartCount: number;
};

export function computeTotals(cart: CartItem[], couponCode: string | null, cod = true) {
  const subtotal = cart.reduce((s, i) => s + (getProduct(i.id)?.price ?? 0) * i.qty, 0);
  const mrpTotal = cart.reduce((s, i) => s + (getProduct(i.id)?.mrp ?? 0) * i.qty, 0);
  const coupon: Coupon | undefined = COUPONS.find((c) => c.code === couponCode && subtotal >= c.min);
  const discount = coupon
    ? coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value
    : 0;
  const afterDiscount = subtotal - discount;
  const shipping = cart.length === 0 || afterDiscount >= SHIPPING.freeAbove ? 0 : SHIPPING.fee;
  const codAllowed = afterDiscount <= SHIPPING.codLimit;
  const codFee = cod && cart.length > 0 ? SHIPPING.codFee : 0;
  return {
    subtotal,
    mrpTotal,
    discount,
    coupon,
    shipping,
    codFee,
    codAllowed,
    total: afterDiscount + shipping + codFee,
  };
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Persisted>(EMPTY);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }, [data, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((text: string, href?: string, cta?: string) => {
    setToast({ id: Date.now(), text, href, cta });
  }, []);

  const store = useMemo<Store>(() => {
    const totals = computeTotals(data.cart, data.coupon);
    return {
      ...data,
      ready,
      toast,
      notify,
      totals,
      cartCount: data.cart.reduce((s, i) => s + i.qty, 0),
      addToCart(id, size, qty = 1) {
        setData((d) => {
          const hit = d.cart.find((i) => i.id === id && i.size === size);
          const cart = hit
            ? d.cart.map((i) => (i === hit ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
            : [...d.cart, { id, size, qty }];
          return { ...d, cart };
        });
        notify("Added to cart", "/cart/", "View cart");
      },
      setQty(id, size, qty) {
        setData((d) => ({
          ...d,
          cart: d.cart.map((i) =>
            i.id === id && i.size === size ? { ...i, qty: Math.max(1, Math.min(10, qty)) } : i
          ),
        }));
      },
      removeFromCart(id, size) {
        setData((d) => ({ ...d, cart: d.cart.filter((i) => !(i.id === id && i.size === size)) }));
      },
      clearCart() {
        setData((d) => ({ ...d, cart: [], coupon: null }));
      },
      toggleWishlist(id) {
        const has = data.wishlist.includes(id);
        setData((d) => ({
          ...d,
          wishlist: has ? d.wishlist.filter((x) => x !== id) : [...d.wishlist, id],
        }));
        notify(has ? "Removed from wishlist" : "Saved to wishlist", "/wishlist/", "Open");
      },
      toggleCompare(id) {
        const has = data.compare.includes(id);
        if (!has && data.compare.length >= 3) {
          notify("You can compare up to 3 products", "/compare/", "Compare");
          return;
        }
        setData((d) => ({
          ...d,
          compare: has ? d.compare.filter((x) => x !== id) : [...d.compare, id],
        }));
        notify(has ? "Removed from compare" : "Added to compare", "/compare/", "Compare");
      },
      applyCoupon(code) {
        const c = COUPONS.find((x) => x.code === code.trim().toUpperCase());
        if (!c) return "Invalid coupon code";
        if (totals.subtotal < c.min) return `Add items worth ₹${c.min.toLocaleString("en-IN")} to use ${c.code}`;
        setData((d) => ({ ...d, coupon: c.code }));
        return null;
      },
      removeCoupon() {
        setData((d) => ({ ...d, coupon: null }));
      },
      placeOrder(address) {
        const order: Order = {
          id: "RM" + Date.now().toString(36).toUpperCase(),
          date: new Date().toISOString(),
          items: data.cart.map((i) => {
            const p = getProduct(i.id)!;
            return { id: i.id, name: p.name, size: i.size, qty: i.qty, price: p.price };
          }),
          subtotal: totals.subtotal,
          discount: totals.discount,
          shipping: totals.shipping,
          codFee: totals.codFee,
          total: totals.total,
          payment: "COD",
          coupon: totals.coupon?.code,
          address,
        };
        setData((d) => ({ ...d, cart: [], coupon: null, orders: [order, ...d.orders] }));
        return order;
      },
    };
  }, [data, ready, toast, notify]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}
