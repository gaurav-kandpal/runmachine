import type { NextConfig } from "next";

// Static export: `npm run build` creates the `out/` folder, which is uploaded
// as-is to Hostinger's public_html. Set NEXT_PUBLIC_BASE_PATH only when the
// site lives in a sub-folder (e.g. GitHub Pages demo).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;
