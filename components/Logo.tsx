export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="w-9 h-9" aria-hidden>
        <rect width="40" height="40" rx="10" fill="#ff4d1c" />
        <path d="M10 29V11h9.500q6 0 6 5.500 0 4-3.500 5.200L26.500 29h-4.800l-4-6.600h-3.200V29zm4.500-10.300h4.300q2.200 0 2.200-2t-2.200-2h-4.300z" fill="#fff" />
        <path d="M27 11h4l-3 6h-4z" fill="#0a0c0f" opacity=".85" />
      </svg>
      <span className="display text-[22px] leading-none">
        Run<span className="text-brand">Machine</span>
      </span>
    </span>
  );
}
