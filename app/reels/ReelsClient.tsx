"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconClose, IconHeart, IconInstagram, IconPlay, IconShare, IconUpload, IconWhatsApp } from "@/components/Icons";
import ReelPoster from "@/components/ReelPoster";
import { BRAND, REELS, Reel, getProduct, inr } from "@/lib/data";
import { useStore } from "@/lib/store";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const TAGS = ["All", "Team", "Customer", "Product", "Training"] as const;
const MAX_MB = 100;

type Upload = { id: string; url: string; caption: string; by: string };

export default function ReelsClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { notify } = useStore();
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const [liked, setLiked] = useState<string[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [playing, setPlaying] = useState<Upload | null>(null);

  const openId = params.get("v");
  const open = REELS.find((r) => r.id === openId) ?? null;
  const list = REELS.filter((r) => tag === "All" || r.tag === tag);
  const close = () => router.replace("/reels/", { scroll: false });

  const share = async (r: Reel) => {
    const url = `${window.location.origin}${BASE}/reels/?v=${r.id}`;
    try {
      if (navigator.share) await navigator.share({ title: r.title, text: `${r.title} — ${BRAND.full}`, url });
      else {
        await navigator.clipboard.writeText(url);
        notify("Video link copied");
      }
    } catch {}
  };
  const toggleLike = (id: string) => setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  return (
    <div className="wrap py-8 md:py-12">
      <p className="eyebrow">Watch & share</p>
      <h1 className="display text-5xl md:text-6xl mt-2">Reels from the nets</h1>
      <p className="text-muted mt-3 max-w-2xl">
        Match clips from {`Run Machine XI`}, customer videos and training drills. Tap any video to watch, shop the gear in it, or share it with your team.
      </p>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-6">
        {TAGS.map((t) => (
          <button key={t} className={`chip ${tag === t ? "chip-on" : ""}`} onClick={() => setTag(t)}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-6">
        {list.map((r) => {
          const isLiked = liked.includes(r.id);
          return (
            <div key={r.id}>
              <button className="block w-full" onClick={() => router.replace(`/reels/?v=${r.id}`, { scroll: false })} aria-label={`Play: ${r.title}`}>
                <ReelPoster reel={r} />
              </button>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <button className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-panel ${isLiked ? "text-brand" : "text-muted"}`} onClick={() => toggleLike(r.id)} aria-pressed={isLiked}>
                  <IconHeart className="w-4 h-4" filled={isLiked} /> {(r.likes + (isLiked ? 1 : 0)).toLocaleString("en-IN")}
                </button>
                <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-muted hover:bg-panel ml-auto" onClick={() => share(r)}>
                  <IconShare className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <UploadBox uploads={uploads} setUploads={setUploads} onPlay={setPlaying} />

      {open && (
        <Modal onClose={close} label={open.title}>
          <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-5">
            <div className="rounded-2xl overflow-hidden bg-black aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[340px]">
              {open.src ? (
                <video src={BASE + open.src} controls autoPlay playsInline loop className="w-full h-full object-cover" />
              ) : (
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="block h-full relative">
                  <ReelPoster reel={open} />
                </a>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold px-2 py-1 rounded bg-brand text-white w-fit">{open.tag}</span>
              <h2 className="text-xl font-bold mt-3 leading-snug">{open.title}</h2>
              <p className="text-sm text-muted mt-1">{open.by} · {open.views} views</p>
              {!open.src && (
                <p className="text-sm text-muted mt-4 rounded-lg border border-line p-3">
                  Demo slot — the video file isn&apos;t uploaded yet. Watch our latest clips on Instagram meanwhile.
                </p>
              )}
              <ShopTheReel reel={open} />
              <div className="grid grid-cols-2 gap-2 mt-auto pt-5">
                <button className="btn btn-ghost btn-sm" onClick={() => share(open)}><IconShare className="w-4 h-4" /> Share</button>
                <a className="btn btn-ghost btn-sm" href={`https://wa.me/?text=${encodeURIComponent(`${open.title} — ${typeof window !== "undefined" ? window.location.href : ""}`)}`} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp className="w-4 h-4" /> WhatsApp
                </a>
                <a className="btn btn-primary btn-sm col-span-2" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
                  <IconInstagram className="w-4 h-4" /> Watch on Instagram
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {playing && (
        <Modal onClose={() => setPlaying(null)} label={playing.caption}>
          <div className="rounded-2xl overflow-hidden bg-black max-h-[72vh] mx-auto w-full max-w-[380px]">
            <video src={playing.url} controls autoPlay playsInline className="w-full max-h-[72vh]" />
          </div>
          <p className="font-semibold mt-4 text-center">{playing.caption}</p>
          <p className="text-sm text-muted text-center">by {playing.by}</p>
        </Modal>
      )}
    </div>
  );
}

function ShopTheReel({ reel }: { reel: Reel }) {
  const p = reel.productId ? getProduct(reel.productId) : undefined;
  if (!p) return null;
  return (
    <Link href={`/product/${p.slug}/`} className="card p-3 mt-4 flex items-center gap-3 hover:border-brand">
      <span className="text-xs font-bold text-brand uppercase tracking-wider shrink-0">Shop the gear</span>
      <span className="text-sm font-semibold line-clamp-1 flex-1">{p.name}</span>
      <span className="font-bold text-sm">{inr(p.price)}</span>
    </Link>
  );
}

function Modal({ children, onClose, label }: { children: React.ReactNode; onClose: () => void; label: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative card p-5 w-full max-w-3xl max-h-[92vh] overflow-y-auto rise">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ink border border-line grid place-items-center">
          <IconClose className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

function UploadBox({ uploads, setUploads, onPlay }: { uploads: Upload[]; setUploads: React.Dispatch<React.SetStateAction<Upload[]>>; onPlay: (u: Upload) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [by, setBy] = useState("");
  const [error, setError] = useState("");

  const pick = (f: File | undefined) => {
    setError("");
    if (!f) return;
    if (!f.type.startsWith("video/")) return setError("Please choose a video file (MP4, MOV or WebM).");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`Video is larger than ${MAX_MB} MB. Trim it and try again.`);
    setFile(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Choose a video first.");
    if (!caption.trim() || !by.trim()) return setError("Add a caption and your name.");
    setUploads((u) => [{ id: String(Date.now()), url: URL.createObjectURL(file), caption: caption.trim(), by: by.trim() }, ...u]);
    setFile(null);
    setCaption("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section className="mt-16 grid lg:grid-cols-2 gap-6" id="share">
      <div className="card p-6 md:p-8">
        <p className="eyebrow">Share your video</p>
        <h2 className="display text-4xl mt-2">Get featured</h2>
        <p className="text-muted mt-3 text-sm">
          Upload your best shot, unboxing or match clip with Run Machine gear. The best ones go on our Instagram and win store coupons.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label
            className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line hover:border-brand p-8 text-center cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]); }}
          >
            <IconUpload className="w-7 h-7 text-brand" />
            <span className="font-semibold text-sm">{file ? file.name : "Tap to choose or drop a video"}</span>
            <span className="text-xs text-muted">{file ? `${(file.size / 1048576).toFixed(1)} MB` : `MP4 / MOV / WebM · up to ${MAX_MB} MB`}</span>
            <input ref={fileRef} type="file" accept="video/*" className="sr-only" onChange={(e) => pick(e.target.files?.[0])} />
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="input" placeholder="Your name / city" value={by} onChange={(e) => setBy(e.target.value)} aria-label="Your name" maxLength={40} />
            <input className="input" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} aria-label="Caption" maxLength={80} />
          </div>
          {error && <p className="text-sm text-brand" role="alert">{error}</p>}
          <button className="btn btn-primary w-full">Add my video</button>
          <p className="text-xs text-muted">
            Demo mode: your video plays only on this device and is not uploaded anywhere. Public submissions switch on with the backend — until then, send clips on{" "}
            <a className="underline" href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Run Machine, sharing my video for the Reels page:")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
            or tag {BRAND.instagramHandle}.
          </p>
        </form>
      </div>

      <div className="card p-6 md:p-8">
        <p className="label">Your uploads ({uploads.length})</p>
        {uploads.length === 0 ? (
          <div className="h-full min-h-48 grid place-items-center text-center text-muted text-sm">
            <p>Videos you add will appear here,<br />ready to play.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {uploads.map((u) => (
              <button key={u.id} onClick={() => onPlay(u)} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black border border-line text-left group" aria-label={`Play: ${u.caption}`}>
                <video src={u.url + "#t=0.1"} muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <span className="absolute inset-0 grid place-items-center text-white"><IconPlay className="w-8 h-8 group-hover:scale-110 transition-transform" /></span>
                <span className="absolute bottom-0 p-2.5 text-xs text-white">
                  <span className="font-semibold line-clamp-2 block">{u.caption}</span>
                  <span className="opacity-70">{u.by}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
