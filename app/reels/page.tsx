import type { Metadata } from "next";
import { Suspense } from "react";
import ReelsClient from "./ReelsClient";

export const metadata: Metadata = {
  title: "Reels & video share",
  description: "Watch Run Machine match clips, customer videos and training drills — and share your own.",
};

export default function ReelsPage() {
  return (
    <Suspense fallback={<div className="wrap py-20 text-muted">Loading videos…</div>}>
      <ReelsClient />
    </Suspense>
  );
}
