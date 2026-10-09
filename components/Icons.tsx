type P = { className?: string; filled?: boolean };

const base = (className = "w-5 h-5") => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconSearch = ({ className }: P) => (
  <svg {...base(className)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const IconCart = ({ className }: P) => (
  <svg {...base(className)}><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2" /><circle cx="9.500" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
);
export const IconHeart = ({ className, filled }: P) => (
  <svg {...base(className)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7a4.300 4.300 0 0 1 7.500 2.800C19.500 15.400 12 20 12 20Z" /></svg>
);
export const IconMenu = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = ({ className }: P) => (
  <svg {...base(className)}><path d="m6 6 12 12M18 6 6 18" /></svg>
);
export const IconStar = ({ className = "w-4 h-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m12 2.500 2.900 6.100 6.600.9-4.800 4.600 1.200 6.600L12 17.500l-5.900 3.200 1.200-6.600L2.500 9.500l6.600-.9z" /></svg>
);
export const IconTruck = ({ className }: P) => (
  <svg {...base(className)}><path d="M2 6h11v10H2zM13 9h4.500L21 12.500V16h-8z" /><circle cx="6.500" cy="17.500" r="1.800" /><circle cx="17" cy="17.500" r="1.800" /></svg>
);
export const IconCash = ({ className }: P) => (
  <svg {...base(className)}><rect x="2.500" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.800" /><path d="M6 9.500v5M18 9.500v5" /></svg>
);
export const IconShield = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 3 4.500 6v5.500c0 4.600 3.200 8 7.500 9.500 4.300-1.500 7.500-4.900 7.500-9.500V6z" /><path d="m9 12 2.200 2.200L15.200 10" /></svg>
);
export const IconReturn = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="M8 5 4 9l4 4" /></svg>
);
export const IconPlay = ({ className }: P) => (
  <svg className={className ?? "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5.500v13a1 1 0 0 0 1.500.9l10.500-6.500a1 1 0 0 0 0-1.700L9.500 4.600A1 1 0 0 0 8 5.500Z" /></svg>
);
export const IconShare = ({ className }: P) => (
  <svg {...base(className)}><circle cx="6" cy="12" r="2.500" /><circle cx="17.500" cy="5.500" r="2.500" /><circle cx="17.500" cy="18.500" r="2.500" /><path d="m8.200 10.800 7-4M8.200 13.200l7 4" /></svg>
);
export const IconCompare = ({ className }: P) => (
  <svg {...base(className)}><path d="M8 4v16M16 4v16M4 8l4-4 4 4M12 16l4 4 4-4" /></svg>
);
export const IconCheck = ({ className }: P) => (
  <svg {...base(className)}><path d="m5 12.500 4.500 4.500L19 7.500" /></svg>
);
export const IconInstagram = ({ className }: P) => (
  <svg {...base(className)}><rect x="3.500" y="3.500" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.200" cy="6.800" r=".6" fill="currentColor" /></svg>
);
export const IconWhatsApp = ({ className }: P) => (
  <svg className={className ?? "w-5 h-5"} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.200a9.800 9.800 0 0 0-8.400 14.800L2.200 21.800l4.900-1.300A9.800 9.800 0 1 0 12 2.200Zm0 17.800a8 8 0 0 1-4.100-1.100l-.3-.2-2.900.8.800-2.800-.2-.3A8 8 0 1 1 12 20Zm4.400-5.900c-.2-.1-1.400-.7-1.600-.8s-.4-.1-.5.100-.6.800-.8 1-.3.200-.5.100a6.600 6.600 0 0 1-3.300-2.900c-.200-.4.200-.4.700-1.200a.4.400 0 0 0 0-.4c-.1-.1-.5-1.300-.7-1.800s-.4-.4-.5-.4h-.5a.9.900 0 0 0-.7.3 2.800 2.800 0 0 0-.9 2.100 4.900 4.900 0 0 0 1 2.600 11.100 11.100 0 0 0 4.300 3.800c1.600.7 2.200.7 3 .6a2.600 2.600 0 0 0 1.700-1.200 2.100 2.100 0 0 0 .1-1.200c0-.1-.2-.2-.400-.3Z" /></svg>
);
export const IconUpload = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
);
export const IconPin = ({ className }: P) => (
  <svg {...base(className)}><path d="M12 21s-6.500-5.600-6.500-11a6.500 6.500 0 0 1 13 0c0 5.400-6.500 11-6.500 11Z" /><circle cx="12" cy="10" r="2.300" /></svg>
);
export const IconTrash = ({ className }: P) => (
  <svg {...base(className)}><path d="M4 7h16M9 7V4.500h6V7M6.500 7l.8 12a1 1 0 0 0 1 1h7.400a1 1 0 0 0 1-1l.8-12" /></svg>
);

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex text-gold ${className}`} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(value) ? "" : "opacity-25"}>
          <IconStar className="w-3.5 h-3.5" />
        </span>
      ))}
    </span>
  );
}
