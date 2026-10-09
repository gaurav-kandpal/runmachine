import type { ArtKind } from "@/lib/data";

type Props = {
  kind: ArtKind;
  primary: string;
  accent: string;
  /** 0 = hero angle, 1 = reverse angle, 2 = close-up, 3 = side-on */
  view?: number;
  className?: string;
  plain?: boolean;
};

const WOOD = "#e9cc98";
const WOOD_DARK = "#d1ad70";

function Bat({ primary, accent, tennis }: { primary: string; accent: string; tennis?: boolean }) {
  return (
    <g>
      <rect x="93" y="8" width="14" height="62" rx="6" fill={accent} />
      {[16, 26, 36, 46, 56].map((y) => (
        <rect key={y} x="93" y={y} width="14" height="3" fill={primary} opacity=".85" />
      ))}
      <path d="M93 66h14l10 14H83z" fill={WOOD_DARK} />
      <path d="M81 78h38l4 96q0 18-23 18t-23-18z" fill={WOOD} />
      <path d="M100 78v114" stroke={WOOD_DARK} strokeWidth="1.5" opacity=".6" />
      {tennis && <path d="M84 150h32l1 26q0 14-17 14t-17-14z" fill={WOOD_DARK} opacity=".55" />}
      <rect x="84" y="92" width="32" height="40" rx="3" fill={primary} />
      <rect x="84" y="108" width="32" height="6" fill={accent} />
      <text x="100" y="104" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial">RUN</text>
      <text x="100" y="127" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff" fontFamily="Arial">MACHINE</text>
      <rect x="86" y="140" width="28" height="4" rx="2" fill={primary} opacity=".8" />
      <rect x="90" y="148" width="20" height="3" rx="1.5" fill={accent} opacity=".6" />
    </g>
  );
}

function Gloves({ primary, accent }: { primary: string; accent: string }) {
  const one = (x: number, flip = false) => (
    <g transform={flip ? `translate(${x + 70} 0) scale(-1 1)` : `translate(${x} 0)`}>
      <rect x="10" y="118" width="50" height="46" rx="8" fill={accent} />
      <rect x="10" y="150" width="50" height="8" fill={primary} />
      <rect x="6" y="66" width="58" height="62" rx="14" fill={primary} stroke={accent} strokeWidth="2" />
      {[8, 22, 36, 50].map((fx, i) => (
        <g key={fx}>
          <rect x={fx} y={34 - (i === 1 || i === 2 ? 8 : 0)} width="12" height={44 + (i === 1 || i === 2 ? 8 : 0)} rx="6" fill={primary} stroke={accent} strokeWidth="2" />
          <rect x={fx + 2} y={48} width="8" height="4" rx="2" fill={accent} opacity=".7" />
          <rect x={fx + 2} y={60} width="8" height="4" rx="2" fill={accent} opacity=".7" />
        </g>
      ))}
      <rect x="-6" y="78" width="16" height="34" rx="8" fill={primary} stroke={accent} strokeWidth="2" />
      <rect x="18" y="92" width="34" height="14" rx="3" fill={accent} />
      <text x="35" y="102" textAnchor="middle" fontSize="7" fontWeight="800" fill={primary} fontFamily="Arial">RM</text>
    </g>
  );
  return (
    <g>
      {one(22)}
      {one(108, true)}
    </g>
  );
}

function Pads({ primary, accent }: { primary: string; accent: string }) {
  const one = (x: number) => (
    <g transform={`translate(${x} 0)`}>
      <path d="M6 30q0-16 24-16t24 16v120q0 24-24 24T6 150z" fill={primary} stroke="#c9ced6" strokeWidth="2" />
      {[20, 30, 40].map((lx) => (
        <path key={lx} d={`M${lx} 20v70`} stroke="#c9ced6" strokeWidth="2" />
      ))}
      {[94, 106, 118].map((y) => (
        <rect key={y} x="8" y={y} width="44" height="9" rx="4.5" fill={primary} stroke="#c9ced6" strokeWidth="2" />
      ))}
      <rect x="2" y="50" width="56" height="8" rx="3" fill={accent} />
      <rect x="2" y="136" width="56" height="8" rx="3" fill={accent} />
      <rect x="18" y="150" width="24" height="12" rx="2" fill={accent} />
      <text x="30" y="159" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff" fontFamily="Arial">RM</text>
    </g>
  );
  return (
    <g>
      {one(34)}
      {one(106)}
    </g>
  );
}

function Helmet({ primary, accent }: { primary: string; accent: string }) {
  return (
    <g>
      <path d="M34 112q0-70 68-70t64 66v10H34z" fill={primary} />
      <path d="M52 86q10-34 50-34" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".25" />
      <path d="M100 42v76" stroke={accent} strokeWidth="6" />
      <path d="M150 108h34q6 0 6 6t-6 6h-46z" fill={primary} />
      <path d="M150 108h34" stroke={accent} strokeWidth="3" />
      <g stroke="#b9c0c9" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M100 124h72" />
        <path d="M96 138h70" />
        <path d="M94 152h60" />
        <path d="M112 120v40M134 120v38M156 120v30" />
      </g>
      <path d="M34 118h60v22q0 22-22 22H56q-22 0-22-22z" fill={primary} opacity=".92" />
      <circle cx="66" cy="96" r="12" fill={accent} />
      <text x="66" y="99.500" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="Arial">RM</text>
    </g>
  );
}

function Guard({ primary, accent }: { primary: string; accent: string }) {
  return (
    <g>
      <rect x="30" y="34" width="140" height="14" rx="7" fill={accent} />
      <path d="M58 44h84q14 0 12 16l-10 86q-4 26-44 26t-44-26L46 60q-2-16 12-16z" fill={primary} stroke="#c9ced6" strokeWidth="2" />
      <path d="M70 62h60l-7 70q-2 18-23 18t-23-18z" fill={accent} opacity=".12" />
      {[78, 98, 118].map((y) => (
        <path key={y} d={`M64 ${y}h72`} stroke={accent} strokeWidth="2" opacity=".35" />
      ))}
      <rect x="82" y="134" width="36" height="14" rx="3" fill={accent} />
      <text x="100" y="144" textAnchor="middle" fontSize="8" fontWeight="800" fill={primary} fontFamily="Arial">RM</text>
      <rect x="20" y="96" width="34" height="10" rx="5" fill={accent} />
      <rect x="146" y="96" width="34" height="10" rx="5" fill={accent} />
    </g>
  );
}

function Bag({ primary, accent }: { primary: string; accent: string }) {
  return (
    <g>
      <path d="M70 70q0-30 30-30t30 30" stroke={accent} strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="18" y="66" width="164" height="92" rx="20" fill={primary} />
      <rect x="18" y="66" width="164" height="22" rx="11" fill="#000" opacity=".18" />
      <path d="M30 88h140" stroke="#fff" strokeWidth="2" strokeDasharray="5 4" opacity=".5" />
      <rect x="34" y="100" width="56" height="44" rx="8" fill="#000" opacity=".2" />
      <rect x="104" y="100" width="64" height="44" rx="8" fill={accent} />
      <text x="136" y="120" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="Arial">RUN</text>
      <text x="136" y="134" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="Arial">MACHINE</text>
      <circle cx="48" cy="164" r="10" fill="#0a0c0f" stroke="#59626e" strokeWidth="3" />
      <circle cx="152" cy="164" r="10" fill="#0a0c0f" stroke="#59626e" strokeWidth="3" />
    </g>
  );
}

const VIEW_TRANSFORMS = [
  "rotate(22 100 100)",
  "rotate(-22 100 100) translate(200 0) scale(-1 1)",
  "translate(-80 -30) scale(1.8)",
  "rotate(90 100 100) scale(.92) translate(8 8)",
];

export default function ProductArt({ kind, primary, accent, view = 0, className, plain }: Props) {
  const upright = kind === "bat" || kind === "tennisbat";
  const transform = upright
    ? VIEW_TRANSFORMS[view % 4]
    : ["", "translate(200 0) scale(-1 1)", "translate(-50 -40) scale(1.5)", "rotate(-12 100 100) scale(.9) translate(10 10)"][view % 4];
  const gid = `g-${kind}-${primary.replace("#", "")}-${view}`;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${kind} illustration`}>
      {!plain && (
        <>
          <defs>
            <radialGradient id={gid} cx="50%" cy="38%" r="75%">
              <stop offset="0" stopColor={primary} stopOpacity=".34" />
              <stop offset="1" stopColor="#13171c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="#1a2027" />
          <rect width="200" height="200" fill={`url(#${gid})`} />
          <ellipse cx="100" cy="182" rx="62" ry="7" fill="#000" opacity=".35" />
        </>
      )}
      <g transform={transform}>
        {kind === "bat" && <Bat primary={primary} accent={accent} />}
        {kind === "tennisbat" && <Bat primary={primary} accent={accent} tennis />}
        {kind === "gloves" && <Gloves primary={primary} accent={accent} />}
        {kind === "pads" && <Pads primary={primary} accent={accent} />}
        {kind === "helmet" && <Helmet primary={primary} accent={accent} />}
        {kind === "guard" && <Guard primary={primary} accent={accent} />}
        {kind === "bag" && <Bag primary={primary} accent={accent} />}
      </g>
    </svg>
  );
}
