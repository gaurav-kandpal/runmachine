import { Product } from "@/lib/data";
import ProductArt from "./ProductArt";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Real photo if the product has `images`, otherwise the generated illustration. */
export default function ProductImage({ p, view = 0, className }: { p: Product; view?: number; className?: string }) {
  const src = p.images?.[view] ?? p.images?.[0];
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={BASE + src} alt={p.name} className={className} loading="lazy" />;
  }
  return <ProductArt {...p.art} view={view} className={className} />;
}
