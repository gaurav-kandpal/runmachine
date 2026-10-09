import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = { title: "Shop all cricket gear" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="wrap py-20 text-muted">Loading products…</div>}>
      <ShopClient />
    </Suspense>
  );
}
