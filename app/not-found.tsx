import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <p className="display text-[120px] text-brand leading-none">404</p>
      <h1 className="display text-4xl mt-2">Clean bowled — page not found</h1>
      <p className="text-muted mt-3">The page you&apos;re looking for has left the crease.</p>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </div>
  );
}
