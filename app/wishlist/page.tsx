"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist, ready } = useStore();
  if (!ready) return <div className="wrap py-20 text-muted">Loading wishlist…</div>;
  const list = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wrap py-8 md:py-12">
      <h1 className="display text-5xl">Wishlist</h1>
      {list.length === 0 ? (
        <div className="card p-10 text-center mt-8">
          <p className="display text-3xl">Nothing saved yet</p>
          <p className="text-muted mt-2">Tap the heart on any product to keep it here.</p>
          <Link href="/shop/" className="btn btn-primary mt-6">Browse gear</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-8">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
