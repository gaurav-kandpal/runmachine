import { Reel } from "@/lib/data";
import { IconPlay } from "./Icons";
import ProductArt from "./ProductArt";

export default function ReelPoster({ reel }: { reel: Reel }) {
  return (
    <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-line bg-panel-2 group">
      <ProductArt {...reel.art} view={2} className="absolute inset-0 w-full h-full object-cover scale-150 transition-transform duration-700 group-hover:scale-[1.65]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40" />
      <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded bg-brand text-white">{reel.tag}</span>
      <span className="absolute top-3 right-3 text-[11px] font-semibold text-white/90">{reel.views} views</span>
      <span className="absolute inset-0 grid place-items-center">
        <span className="w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/40 grid place-items-center text-white transition-transform group-hover:scale-110">
          <IconPlay className="w-6 h-6 ml-0.5" />
        </span>
      </span>
      <div className="absolute bottom-0 inset-x-0 p-3 text-left">
        <p className="text-sm font-semibold text-white leading-snug line-clamp-2">{reel.title}</p>
        <p className="text-xs text-white/70 mt-1">{reel.by}</p>
      </div>
    </div>
  );
}
