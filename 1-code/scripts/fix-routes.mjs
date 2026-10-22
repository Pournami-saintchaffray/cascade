// Restores dynamic-route folder names ("-slug-" -> "[slug]") that some file systems/exporters can't store.
import { readdirSync, renameSync, statSync } from 'node:fs';
import { join } from 'node:path';
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    const fixed = name.replace(/^-(.+)-$/, '[$1]');
    const target = join(dir, fixed);
    if (fixed !== name) { renameSync(p, target); console.log('route:', p, '->', target); }
    walk(target);
  }
};
walk(new URL('../app', import.meta.url).pathname);
