// ---------------------------------------------------------------------------
// DUMMY DATA — jab backend banega tab ye file API calls se replace hogi.
// Har cheez (products, coupons, reels, team) yahin se aati hai.
// ---------------------------------------------------------------------------

export const BRAND = {
  name: "Run Machine",
  full: "Run Machine Sports",
  tagline: "For the young run machine.",
  phone: "088264 66500",
  whatsapp: "918882422976",
  email: "sportsrunmachine@gmail.com",
  address: "B, Old Post Office St, Block S, Nanakpura, Shakarpur, Delhi 110092",
  instagram: "https://www.instagram.com/run_sports_machine/",
  instagramHandle: "@run_sports_machine",
};

export const SHIPPING = { freeAbove: 999, fee: 79, codFee: 49, codLimit: 25000 };

export type ArtKind = "bat" | "tennisbat" | "gloves" | "pads" | "helmet" | "guard" | "bag";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  art: ArtKind;
};

export const CATEGORIES: Category[] = [
  { slug: "leather-bats", name: "Leather Bats", blurb: "English & Kashmir willow", art: "bat" },
  { slug: "tennis-bats", name: "Tennis Bats", blurb: "Double blade, hard tennis", art: "tennisbat" },
  { slug: "gloves", name: "Batting Gloves", blurb: "Match & club grade", art: "gloves" },
  { slug: "pads", name: "Batting Pads", blurb: "Lightweight protection", art: "pads" },
  { slug: "keeping", name: "Wicket Keeping", blurb: "Pads & gloves", art: "gloves" },
  { slug: "helmets", name: "Helmets", blurb: "Steel & titanium grille", art: "helmet" },
  { slug: "guards", name: "Thigh Guards", blurb: "Combo & single", art: "guard" },
  { slug: "kit-bags", name: "Kit Bags", blurb: "Duffle & wheelie", art: "bag" },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badge?: "Bestseller" | "New" | "Team Pick" | "Limited";
  sizes: string[];
  stock: number;
  short: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  level: "Beginner" | "Club" | "Pro";
  art: { kind: ArtKind; primary: string; accent: string };
  /** Asli photos aane par yahan paths daalo, e.g. ["/products/ew-bat-1.jpg"] */
  images?: string[];
  video?: string;
};

const batSizes = ["SH", "LH", "Harrow", "Size 6", "Size 5", "Size 4"];
const gloveSizes = ["Men RH", "Men LH", "Youth RH", "Youth LH", "Boys RH"];
const padSizes = ["Men", "Youth", "Boys"];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "run-machine-english-willow-players-edition",
    name: "Run Machine English Willow Bat — Players Edition",
    category: "leather-bats",
    price: 14999,
    mrp: 21999,
    rating: 4.9,
    reviewCount: 64,
    badge: "Team Pick",
    sizes: ["SH", "LH"],
    stock: 6,
    short: "Grade 1 English willow, 40 mm edges, hand-picked by our team players.",
    description:
      "The bat our own Run Machine XI openers carry. Grade 1 English willow, pressed for a quick pick-up and a big mid-to-low sweet spot built for Indian pitches. Every piece is knocked-in and weighed before dispatch.",
    features: [
      "Grade 1 English willow, 8–10 straight grains",
      "40–42 mm edges with a full spine profile",
      "Mid-to-low sweet spot for sub-continent wickets",
      "Sarawak cane handle with pro chevron grip",
      "Ready to play — pre knocked-in, with padded cover",
    ],
    specs: {
      Willow: "English Willow — Grade 1",
      Weight: "1160–1200 g",
      Grains: "8–10 straight",
      Edges: "40–42 mm",
      "Sweet spot": "Mid to low",
      Handle: "Sarawak cane, round",
      Includes: "Padded full-length cover",
    },
    level: "Pro",
    art: { kind: "bat", primary: "#ff4d1c", accent: "#111418" },
  },
  {
    id: "p02",
    slug: "english-willow-leather-bat-with-cover",
    name: "English Willow Leather Bat with Cover",
    category: "leather-bats",
    price: 5499,
    mrp: 8999,
    rating: 4.7,
    reviewCount: 212,
    badge: "Bestseller",
    sizes: batSizes,
    stock: 23,
    short: "Entry English willow with real ping — best value in the range.",
    description:
      "A genuine English willow bat at a club-cricketer price. Light pick-up, thick edges and a forgiving middle make it the right first step up from Kashmir willow.",
    features: [
      "Grade 3 English willow, 5–7 grains",
      "36–38 mm edges, light pick-up",
      "Mid sweet spot, all-round profile",
      "Singapore cane handle",
      "Free bat cover included",
    ],
    specs: {
      Willow: "English Willow — Grade 3",
      Weight: "1140–1220 g",
      Grains: "5–7",
      Edges: "36–38 mm",
      "Sweet spot": "Mid",
      Handle: "Singapore cane",
      Includes: "Bat cover",
    },
    level: "Club",
    art: { kind: "bat", primary: "#1c6bff", accent: "#ffc53d" },
  },
  {
    id: "p03",
    slug: "leather-kashmiri-willow-bat-with-cover",
    name: "Leather Kashmiri Willow Bat with Cover",
    category: "leather-bats",
    price: 4199,
    mrp: 5999,
    rating: 4.6,
    reviewCount: 341,
    badge: "Bestseller",
    sizes: batSizes,
    stock: 40,
    short: "Tough Kashmir willow for leather ball — academy favourite.",
    description:
      "Built for daily nets. Dense Kashmir willow takes leather-ball punishment season after season, with a profile that still feels balanced in the hands.",
    features: [
      "Selected Kashmir willow",
      "34–36 mm edges",
      "Durable toe guard fitted",
      "Cane handle with shock absorber",
      "Free bat cover included",
    ],
    specs: {
      Willow: "Kashmir Willow — Selected",
      Weight: "1180–1260 g",
      Edges: "34–36 mm",
      "Sweet spot": "Mid",
      Handle: "Cane with rubber insert",
      Includes: "Bat cover",
    },
    level: "Beginner",
    art: { kind: "bat", primary: "#16a34a", accent: "#111418" },
  },
  {
    id: "p04",
    slug: "junior-league-kashmir-willow-bat",
    name: "Junior League Kashmir Willow Bat",
    category: "leather-bats",
    price: 2499,
    mrp: 3499,
    rating: 4.5,
    reviewCount: 98,
    badge: "New",
    sizes: ["Harrow", "Size 6", "Size 5", "Size 4", "Size 3"],
    stock: 31,
    short: "Light pick-up made for U-10 to U-14 players.",
    description:
      "Scaled-down weight and handle so young players learn correct technique instead of fighting a heavy bat.",
    features: [
      "Lightweight Kashmir willow",
      "Thin junior handle",
      "Fibre-tape face protection",
      "Sizes 3 to Harrow",
    ],
    specs: {
      Willow: "Kashmir Willow",
      Weight: "850–1050 g (by size)",
      Edges: "28–32 mm",
      "Sweet spot": "Mid",
      Handle: "Junior cane",
    },
    level: "Beginner",
    art: { kind: "bat", primary: "#c6ff3d", accent: "#111418" },
  },
  {
    id: "p05",
    slug: "tennis-double-blade-rapid",
    name: "Tennis Double Blade (Rapid)",
    category: "tennis-bats",
    price: 2399,
    mrp: 4099,
    rating: 4.8,
    reviewCount: 187,
    badge: "Bestseller",
    sizes: ["Full Size"],
    stock: 18,
    short: "Double-blade scoop bat for hard tennis tournaments.",
    description:
      "The Rapid is cut with a deep scoop and double blade so the weight sits low — exactly where tennis-ball power hitters want it.",
    features: [
      "Double blade, deep scoop back",
      "Thick 40 mm bottom edges",
      "Long handle for extra leverage",
      "Light pick-up, 1050–1120 g",
    ],
    specs: {
      Willow: "Kashmir Willow — Double Blade",
      Weight: "1050–1120 g",
      Edges: "40 mm (bottom)",
      "Sweet spot": "Low",
      Handle: "Long, round",
    },
    level: "Club",
    art: { kind: "tennisbat", primary: "#111418", accent: "#ff4d1c" },
  },
  {
    id: "p06",
    slug: "tennis-scoop-night-striker",
    name: "Tennis Scoop Bat — Night Striker",
    category: "tennis-bats",
    price: 1799,
    mrp: 2799,
    rating: 4.4,
    reviewCount: 76,
    sizes: ["Full Size"],
    stock: 27,
    short: "Single scoop, fluorescent stickers for night tournaments.",
    description:
      "A lighter scoop bat for box cricket and night tournaments, finished with high-visibility stickers.",
    features: ["Single scoop back", "36 mm edges", "Hi-vis sticker set", "950–1050 g"],
    specs: {
      Willow: "Kashmir Willow — Scoop",
      Weight: "950–1050 g",
      Edges: "36 mm",
      "Sweet spot": "Low to mid",
      Handle: "Long, round",
    },
    level: "Beginner",
    art: { kind: "tennisbat", primary: "#1f2937", accent: "#c6ff3d" },
  },
  {
    id: "p07",
    slug: "striker-batting-gloves-black",
    name: "Striker Batting Gloves (Black)",
    category: "gloves",
    price: 1399,
    mrp: 1999,
    rating: 4.6,
    reviewCount: 143,
    badge: "Bestseller",
    sizes: gloveSizes,
    stock: 35,
    short: "Leather palm, high-density foam fingers.",
    description:
      "Sheep-leather palm for feel, pre-curved HD foam fingers for protection. A proper match glove at a club price.",
    features: ["Sheep-leather palm", "HD foam + fibre finger rolls", "Mesh gusset ventilation", "Towel wristband"],
    specs: { Palm: "Sheep leather", Protection: "HD foam with fibre inserts", Closure: "Velcro strap", Level: "Club / Match" },
    level: "Club",
    art: { kind: "gloves", primary: "#111418", accent: "#ff4d1c" },
  },
  {
    id: "p08",
    slug: "pro-test-batting-gloves-white",
    name: "Pro Test Batting Gloves (White/Gold)",
    category: "gloves",
    price: 2299,
    mrp: 3299,
    rating: 4.8,
    reviewCount: 52,
    badge: "Team Pick",
    sizes: gloveSizes,
    stock: 12,
    short: "Pittards-style leather palm, sausage-finger build.",
    description: "Top-of-the-range glove worn by our first XI. Soft premium palm and split-thumb design.",
    features: ["Premium leather palm", "Sausage finger rolls", "Split thumb", "Double-sided sweatband"],
    specs: { Palm: "Premium leather", Protection: "Plastazote + fibre", Closure: "Velcro strap", Level: "Pro" },
    level: "Pro",
    art: { kind: "gloves", primary: "#f5f5f4", accent: "#ffc53d" },
  },
  {
    id: "p09",
    slug: "match-lite-batting-pads",
    name: "Match Lite Batting Pads",
    category: "pads",
    price: 999,
    mrp: 1599,
    rating: 4.5,
    reviewCount: 201,
    badge: "Bestseller",
    sizes: padSizes,
    stock: 44,
    short: "Featherweight pads that don't slow your running.",
    description: "High-density foam with cane reinforcement. Light enough to steal the second run.",
    features: ["HD foam with 7 cane rods", "3-bar vertical bolster", "Wide 2\" straps", "Wipe-clean PU face"],
    specs: { Face: "PU", Core: "HD foam + cane", Straps: "2 wide velcro", Weight: "~1.5 kg pair" },
    level: "Club",
    art: { kind: "pads", primary: "#f5f5f4", accent: "#1c6bff" },
  },
  {
    id: "p10",
    slug: "players-pro-batting-pads",
    name: "Players Pro Batting Pads",
    category: "pads",
    price: 2799,
    mrp: 3999,
    rating: 4.7,
    reviewCount: 39,
    sizes: padSizes,
    stock: 9,
    short: "Pro shape, extra knee roll and side wing.",
    description: "Traditional pro-shape pad with added side wing for fast-bowling protection.",
    features: ["Premium PU face", "Triple knee roll", "Reinforced side wing", "Mesh instep"],
    specs: { Face: "Premium PU", Core: "Dual-density foam + cane", Straps: "3 padded", Weight: "~1.7 kg pair" },
    level: "Pro",
    art: { kind: "pads", primary: "#f5f5f4", accent: "#ff4d1c" },
  },
  {
    id: "p11",
    slug: "wicket-keeping-pads",
    name: "Wicket-Keeping Pads",
    category: "keeping",
    price: 1800,
    mrp: 2699,
    rating: 4.5,
    reviewCount: 47,
    sizes: padSizes,
    stock: 14,
    short: "Short-cut keeper pads for fast footwork.",
    description: "Cut short above the knee so you can crouch and move laterally without fighting the pad.",
    features: ["Short-cut profile", "Two-strap fit", "Light foam core", "Reinforced instep"],
    specs: { Face: "PU", Core: "Lightweight foam", Straps: "2 velcro", Weight: "~1.1 kg pair" },
    level: "Club",
    art: { kind: "pads", primary: "#f5f5f4", accent: "#16a34a" },
  },
  {
    id: "p12",
    slug: "wicket-keeping-gloves",
    name: "Wicket-Keeping Gloves",
    category: "keeping",
    price: 1699,
    mrp: 2499,
    rating: 4.6,
    reviewCount: 58,
    sizes: ["Men", "Youth", "Boys"],
    stock: 16,
    short: "Deep cup, pimpled rubber palm.",
    description: "A deep catching cup and soft leather back so the ball sticks from day one.",
    features: ["Octopus-grip rubber palm", "Deep catching cup", "Leather back", "Finger and thumb caps"],
    specs: { Palm: "Pimpled rubber", Back: "Leather", Cuff: "Padded", Level: "Club / Match" },
    level: "Club",
    art: { kind: "gloves", primary: "#16a34a", accent: "#f5f5f4" },
  },
  {
    id: "p13",
    slug: "cricket-helmet-steel-grille",
    name: "Cricket Helmet — Steel Grille",
    category: "helmets",
    price: 2199,
    mrp: 3499,
    rating: 4.7,
    reviewCount: 122,
    badge: "Bestseller",
    sizes: ["S (54–56)", "M (56–58)", "L (58–60)"],
    stock: 20,
    short: "ABS shell, adjustable fit, fixed steel grille.",
    description: "High-impact ABS shell with a fixed steel grille and rear dial for a locked-in fit.",
    features: ["High-impact ABS shell", "Fixed steel grille", "Rear dial adjuster", "Moisture-wicking liner"],
    specs: { Shell: "ABS", Grille: "Powder-coated steel", Fit: "Dial adjuster", Weight: "~850 g" },
    level: "Club",
    art: { kind: "helmet", primary: "#0f2a5c", accent: "#ff4d1c" },
  },
  {
    id: "p14",
    slug: "titanium-pro-helmet",
    name: "Titanium Pro Helmet",
    category: "helmets",
    price: 4499,
    mrp: 6499,
    rating: 4.9,
    reviewCount: 21,
    badge: "Limited",
    sizes: ["S (54–56)", "M (56–58)", "L (58–60)"],
    stock: 4,
    short: "Titanium grille — lighter on the neck through long innings.",
    description: "Same shell protection with a titanium grille that cuts weight where you feel it most.",
    features: ["Titanium grille", "Fibre-reinforced shell", "Neck guard compatible", "Removable washable liner"],
    specs: { Shell: "Fibre-reinforced ABS", Grille: "Titanium", Fit: "Dial adjuster", Weight: "~720 g" },
    level: "Pro",
    art: { kind: "helmet", primary: "#111418", accent: "#ffc53d" },
  },
  {
    id: "p15",
    slug: "thigh-guard-white-black",
    name: "Thigh Guard (White/Black)",
    category: "guards",
    price: 899,
    mrp: 2499,
    rating: 4.4,
    reviewCount: 88,
    sizes: ["Men RH", "Men LH", "Youth RH", "Youth LH"],
    stock: 38,
    short: "Moulded single thigh guard with towel back.",
    description: "Moulded foam guard that sits flat under whites, with a soft towel back.",
    features: ["Moulded HD foam", "Towel-lined back", "Elastic waist + leg straps"],
    specs: { Core: "Moulded HD foam", Lining: "Cotton towel", Type: "Single" },
    level: "Club",
    art: { kind: "guard", primary: "#f5f5f4", accent: "#111418" },
  },
  {
    id: "p16",
    slug: "combo-thigh-guard-pro",
    name: "Combo Thigh Guard Pro",
    category: "guards",
    price: 1899,
    mrp: 2999,
    rating: 4.7,
    reviewCount: 33,
    badge: "New",
    sizes: ["Men RH", "Men LH", "Youth RH", "Youth LH"],
    stock: 15,
    short: "Outer + inner thigh protection in one unit.",
    description: "Dual guard that covers both the front and inner thigh, held by a single waist strap.",
    features: ["Outer and inner thigh pads", "Single adjustable waist belt", "Breathable mesh lining"],
    specs: { Core: "Dual-density foam", Lining: "Air mesh", Type: "Combo" },
    level: "Pro",
    art: { kind: "guard", primary: "#111418", accent: "#ff4d1c" },
  },
  {
    id: "p17",
    slug: "cricket-kit-bag-green",
    name: "Cricket Kit Bag (Green)",
    category: "kit-bags",
    price: 1699,
    mrp: 2399,
    rating: 4.5,
    reviewCount: 109,
    sizes: ["One Size"],
    stock: 26,
    short: "Full-size duffle with bat sleeve and shoe pocket.",
    description: "Fits a full kit plus two bats. Tough polyester with reinforced base.",
    features: ["External padded bat sleeve", "Separate shoe pocket", "Backpack straps", "Reinforced base"],
    specs: { Material: "1680D polyester", Capacity: "~90 L", Type: "Duffle / backpack" },
    level: "Club",
    art: { kind: "bag", primary: "#16a34a", accent: "#111418" },
  },
  {
    id: "p18",
    slug: "team-wheelie-kit-bag",
    name: "Team Wheelie Kit Bag",
    category: "kit-bags",
    price: 3299,
    mrp: 4799,
    rating: 4.8,
    reviewCount: 44,
    badge: "Team Pick",
    sizes: ["One Size"],
    stock: 8,
    short: "Wheelie bag the squad travels with.",
    description: "Heavy-duty wheels, a hard base and room for three bats — built for away fixtures.",
    features: ["Smooth inline wheels", "Hard moulded base", "3 bat compartments", "Lockable zips"],
    specs: { Material: "1680D polyester + PVC", Capacity: "~120 L", Type: "Wheelie" },
    level: "Pro",
    art: { kind: "bag", primary: "#111418", accent: "#ff4d1c" },
  },
];

export const getProduct = (idOrSlug: string) =>
  PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

export const categoryName = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export const discountPct = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

// ---- Coupons ---------------------------------------------------------------
export type Coupon = { code: string; label: string; type: "percent" | "flat"; value: number; min: number };

export const COUPONS: Coupon[] = [
  { code: "RUN10", label: "10% off on everything", type: "percent", value: 10, min: 0 },
  { code: "FIRST200", label: "₹200 off above ₹1,999", type: "flat", value: 200, min: 1999 },
  { code: "TEAM15", label: "15% off above ₹4,999", type: "percent", value: 15, min: 4999 },
];

// ---- Pincode check (dummy logic) -------------------------------------------
export function checkPincode(pin: string) {
  if (!/^[1-9]\d{5}$/.test(pin)) return null;
  const local = pin.startsWith("11") || pin.startsWith("12") || pin.startsWith("20");
  const days = local ? [1, 2] : pin[0] <= "4" ? [3, 5] : [4, 7];
  const d = new Date();
  d.setDate(d.getDate() + days[1]);
  return {
    days,
    by: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
    cod: true,
    local,
  };
}

// ---- Reviews ---------------------------------------------------------------
const REVIEW_POOL = [
  { name: "Aman S.", city: "Delhi", stars: 5, text: "Ping is unreal for this price. Played two matches already, zero complaints." },
  { name: "Rohit K.", city: "Ghaziabad", stars: 5, text: "Ordered COD, reached in 2 days. Packing was solid and the finish is premium." },
  { name: "Vivek T.", city: "Noida", stars: 4, text: "Good quality. Asked for a lighter piece on WhatsApp and they actually picked one for me." },
  { name: "Harsh P.", city: "Jaipur", stars: 5, text: "Bought for my son's academy. Coach approved it straight away." },
  { name: "Sahil M.", city: "Lucknow", stars: 4, text: "Value for money. Took a few net sessions to settle in, now it's my match gear." },
  { name: "Deepak R.", city: "Faridabad", stars: 5, text: "Got the real-time video before dispatch. Exactly what was shown." },
];

export function reviewsFor(p: Product) {
  const start = parseInt(p.id.slice(1), 10) % REVIEW_POOL.length;
  return [0, 1, 2].map((i) => REVIEW_POOL[(start + i) % REVIEW_POOL.length]);
}

// ---- Reels / video share ---------------------------------------------------
export type Reel = {
  id: string;
  title: string;
  by: string;
  tag: "Team" | "Customer" | "Product" | "Training";
  likes: number;
  views: string;
  art: { kind: ArtKind; primary: string; accent: string };
  /** mp4 ko /public/videos mein daalo aur yahan path do, e.g. "/videos/nets.mp4" */
  src?: string;
  productId?: string;
};

export const REELS: Reel[] = [
  { id: "r1", title: "Players Edition — first knock in the nets", by: "Run Machine XI", tag: "Team", likes: 2140, views: "48.2K", art: { kind: "bat", primary: "#ff4d1c", accent: "#111418" }, productId: "p01" },
  { id: "r2", title: "Double Blade Rapid: 6 sixes in an over", by: "Customer · Meerut", tag: "Customer", likes: 5320, views: "112K", art: { kind: "tennisbat", primary: "#111418", accent: "#ff4d1c" }, productId: "p05" },
  { id: "r3", title: "How we pick & weigh every bat before dispatch", by: "Run Machine Workshop", tag: "Product", likes: 980, views: "21.7K", art: { kind: "bat", primary: "#1c6bff", accent: "#ffc53d" }, productId: "p02" },
  { id: "r4", title: "Keeper drills — 5 minutes a day", by: "Coach's Corner", tag: "Training", likes: 1460, views: "33.1K", art: { kind: "gloves", primary: "#16a34a", accent: "#f5f5f4" }, productId: "p12" },
  { id: "r5", title: "Unboxing: Titanium Pro Helmet", by: "Customer · Delhi", tag: "Customer", likes: 720, views: "15.4K", art: { kind: "helmet", primary: "#111418", accent: "#ffc53d" }, productId: "p14" },
  { id: "r6", title: "Match day vlog — Shakarpur Premier League final", by: "Run Machine XI", tag: "Team", likes: 3890, views: "76.5K", art: { kind: "bag", primary: "#111418", accent: "#ff4d1c" }, productId: "p18" },
  { id: "r7", title: "Knocking-in a new bat the right way", by: "Run Machine Workshop", tag: "Training", likes: 2675, views: "59K", art: { kind: "bat", primary: "#16a34a", accent: "#111418" }, productId: "p03" },
  { id: "r8", title: "Happy customer — first fifty with the new bat", by: "Customer · Noida", tag: "Customer", likes: 1105, views: "19.8K", art: { kind: "pads", primary: "#f5f5f4", accent: "#ff4d1c" }, productId: "p10" },
];

// ---- Team (demo data) ------------------------------------------------------
export const TEAM = {
  name: "Run Machine XI",
  home: "Shakarpur, East Delhi",
  founded: 2021,
  record: { played: 42, won: 29, lost: 11, tied: 2 },
};

export type Player = { no: number; name: string; role: "Batter" | "Bowler" | "All-rounder" | "Wicket-keeper"; style: string; stat: string; captain?: boolean; gearId: string };

export const SQUAD: Player[] = [
  { no: 7, name: "Arjun Rawat", role: "Batter", style: "Right-hand opener", stat: "1,284 runs · SR 142", captain: true, gearId: "p01" },
  { no: 18, name: "Kabir Malhotra", role: "Batter", style: "Left-hand top order", stat: "962 runs · Avg 38.4", gearId: "p02" },
  { no: 45, name: "Ishaan Negi", role: "Wicket-keeper", style: "Right-hand, keeper", stat: "611 runs · 41 dismissals", gearId: "p12" },
  { no: 33, name: "Dev Chauhan", role: "All-rounder", style: "RHB · Right-arm medium", stat: "540 runs · 36 wkts", gearId: "p08" },
  { no: 10, name: "Yash Bisht", role: "All-rounder", style: "LHB · Left-arm spin", stat: "478 runs · 44 wkts", gearId: "p05" },
  { no: 99, name: "Rudra Tomar", role: "Bowler", style: "Right-arm fast", stat: "58 wkts · Econ 6.8", gearId: "p13" },
  { no: 21, name: "Nikhil Dabas", role: "Bowler", style: "Right-arm off-spin", stat: "47 wkts · Econ 6.1", gearId: "p15" },
  { no: 4, name: "Parth Saini", role: "Batter", style: "Right-hand finisher", stat: "702 runs · SR 168", gearId: "p06" },
  { no: 56, name: "Aarav Gusain", role: "Bowler", style: "Left-arm fast", stat: "39 wkts · Econ 7.2", gearId: "p14" },
  { no: 12, name: "Tanmay Joshi", role: "All-rounder", style: "RHB · Leg spin", stat: "365 runs · 31 wkts", gearId: "p07" },
  { no: 27, name: "Mohit Rana", role: "Batter", style: "Right-hand middle order", stat: "588 runs · Avg 31.0", gearId: "p10" },
];

export const FIXTURES = [
  { date: "18 Oct 2026", vs: "Laxmi Nagar Lions", venue: "Yamuna Sports Complex", comp: "East Delhi T20 League", time: "8:00 AM" },
  { date: "25 Oct 2026", vs: "Mayur Vihar Mavericks", venue: "Shakarpur Ground", comp: "East Delhi T20 League", time: "2:30 PM" },
  { date: "01 Nov 2026", vs: "Noida Knights", venue: "Sector 21A Stadium, Noida", comp: "NCR Corporate Cup", time: "9:00 AM" },
  { date: "08 Nov 2026", vs: "Preet Vihar Panthers", venue: "Shakarpur Ground", comp: "East Delhi T20 League", time: "8:00 AM" },
];

export const RESULTS = [
  { date: "04 Oct 2026", vs: "Ghaziabad Gladiators", us: "186/5 (20)", them: "161/9 (20)", result: "Won by 25 runs", won: true },
  { date: "27 Sep 2026", vs: "Patparganj Royals", us: "142/8 (20)", them: "143/6 (19.2)", result: "Lost by 4 wickets", won: false },
  { date: "20 Sep 2026", vs: "Vaishali Vipers", us: "201/4 (20)", them: "155 (18.3)", result: "Won by 46 runs", won: true },
  { date: "13 Sep 2026", vs: "Anand Vihar Aces", us: "128/3 (15.1)", them: "127 (19.4)", result: "Won by 7 wickets", won: true },
];
