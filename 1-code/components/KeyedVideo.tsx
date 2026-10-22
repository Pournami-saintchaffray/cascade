'use client';
import { useEffect, useRef } from 'react';

/** Plays a black-background clip with the black keyed out and the white subject toned light grey-blue. */
export function KeyedVideo({ src, crop = 0.8 }: { src: string; crop?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = box.current!, c = canvas.current!, v = video.current!;
    const x = c.getContext('2d', { willReadFrequently: true })!;
    let raf = 0, vis = false;
    const draw = () => {
      raf = 0; if (!vis) return;
      if (v.readyState >= 2 && v.videoWidth) {
        const Wd = 360, H = Math.round(Wd * (el.clientHeight / Math.max(1, el.clientWidth)) || Wd * 1.2);
        if (c.width !== Wd || c.height !== H) { c.width = Wd; c.height = H; }
        const sh = v.videoHeight * crop, sw = sh * Wd / H;
        x.clearRect(0, 0, Wd, H);
        x.drawImage(v, (v.videoWidth - sw) / 2, (v.videoHeight - sh) / 2, sw, sh, 0, 0, Wd, H);
        const img = x.getImageData(0, 0, Wd, H), d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
          const a = Math.min(1, Math.max(0, (l - 0.06) * 1.9)), t = 1 - l;
          d[i] = 236 - 110 * t; d[i + 1] = 240 - 100 * t; d[i + 2] = 247 - 80 * t; d[i + 3] = a * 255;
        }
        x.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      if (vis) { v.play().catch(() => {}); if (!raf) raf = requestAnimationFrame(draw); } else v.pause();
    });
    io.observe(el);
    const ended = () => { v.currentTime = 0; v.play().catch(() => {}); };
    v.addEventListener('ended', ended);
    return () => { io.disconnect(); v.removeEventListener('ended', ended); cancelAnimationFrame(raf); v.pause(); };
  }, [src, crop]);
  return (
    <div ref={box} style={{ position: 'absolute', inset: 0, opacity: 0.8 }}>
      <video ref={video} src={src} muted loop playsInline autoPlay preload="auto" aria-hidden
        style={{ position: 'absolute', left: 0, top: 0, width: 4, height: 4, opacity: 0.01, pointerEvents: 'none' }} />
      <canvas ref={canvas} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
