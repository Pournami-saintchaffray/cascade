'use client';
import { useEffect, useRef } from 'react';

/** Drop rendered on a black ground: luminance → alpha, tinted light grey.
 *  Two decoders alternate so the loop restarts with no seek stall (plays like a gif). */
export function DropVideo({ src }: { src: string }) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const v1 = a.current!, v2 = b.current!, cv = canvas.current; if (!cv) return;
    const ctx = cv.getContext('2d', { willReadFrequently: true })!; const S = cv.width;
    let cur = v1, next = v2, primed = false, raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (cur.readyState < 2 || !cur.videoWidth) return;
      if (cur.paused && !cur.ended && !primed) cur.play().catch(() => {});
      const dur = cur.duration || 0;
      if (dur && !primed && cur.currentTime > dur - 0.35) { primed = true; next.currentTime = 0; next.play().catch(() => {}); }
      if (primed && (cur.ended || cur.currentTime >= dur - 0.06) && next.readyState >= 2 && next.currentTime > 0) {
        cur.pause(); [cur, next] = [next, cur]; primed = false;
      }
      const side = Math.min(cur.videoWidth, cur.videoHeight) * 0.78;
      ctx.clearRect(0, 0, S, S);
      ctx.drawImage(cur, (cur.videoWidth - side) / 2, (cur.videoHeight - side) / 2, side, side, 0, 0, S, S);
      const img = ctx.getImageData(0, 0, S, S), d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const l = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
        d[i] = d[i] * 0.78 + 52; d[i + 1] = d[i + 1] * 0.78 + 54; d[i + 2] = d[i + 2] * 0.78 + 60;
        d[i + 3] = Math.min(1, Math.max(0, (l - 0.04) * 1.6)) * 0.7 * 255;
      }
      ctx.putImageData(img, 0, 0);
    };
    v1.play().catch(() => {});
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  // not 0-size / 0-opacity: browsers pause muted video they consider invisible
  const hidden = { position: 'absolute', left: 0, top: 0, width: 4, height: 4, opacity: 0.01, pointerEvents: 'none' } as const;
  return (
    <>
      <video ref={a} src={src} muted playsInline preload="auto" aria-hidden style={hidden} />
      <video ref={b} src={src} muted playsInline preload="auto" aria-hidden style={hidden} />
      <canvas ref={canvas} width={560} height={560} style={{ width: '100%', height: '100%', display: 'block' }} />
    </>
  );
}
