'use client';
import { useRef } from 'react';

/** Maps n items onto signed offsets around the current index so a carousel can loop forever.
 *  Items that wrap from one end to the other are flagged so they jump without animating. */
export function useLoop(n: number, index: number) {
  const prev = useRef<Record<number, number>>({});
  const out: { i: number; k: number; jump: boolean }[] = [];
  for (let i = 0; i < n; i++) {
    let k = (((i - index) % n) + n) % n;
    if (k >= n / 2) k -= n;
    const p = prev.current[i];
    out.push({ i, k, jump: p !== undefined && Math.abs(p - k) > 1 });
    prev.current[i] = k;
  }
  return out;
}
