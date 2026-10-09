# Run Machine Sports — E-commerce (Next.js)

Front-end only store for Run Machine Sports. All data is dummy and lives in `lib/data.ts`;
cart, wishlist, compare and orders are saved in the browser (`localStorage`). No backend yet.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # creates the static site in out/
```

## Host on Hostinger

The site is a static export, so it works on any Hostinger plan (no Node.js needed).

1. Run `npm run build`.
2. hPanel → **Websites → Manage → File Manager** → open `public_html`.
3. Delete the default files there, then upload **everything inside** `out/`
   (including the hidden `.htaccess` file). Easiest: upload `runmachine-hostinger.zip` and click **Extract**.
4. Open the domain. SSL: hPanel → **Security → SSL** → install the free certificate.

The domain must point to the root (`https://yourdomain.com/`). For a sub-folder, build with
`NEXT_PUBLIC_BASE_PATH=/folder`.

## Where to edit

| What | File |
| --- | --- |
| Products, prices, coupons, reels, team, fixtures | `lib/data.ts` |
| Brand phone / WhatsApp / address | `BRAND` in `lib/data.ts` |
| Shipping fee, COD fee, COD limit | `SHIPPING` in `lib/data.ts` |
| Real product photos | put files in `public/products/`, add `images: ["/products/x.jpg"]` to the product |
| Real videos | put MP4s in `public/videos/`, add `src: "/videos/x.mp4"` to the reel |
| Cart / order logic (replace with API later) | `lib/store.tsx` |
