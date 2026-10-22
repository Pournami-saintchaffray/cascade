/** small violet triangles (projects carousel) · large pink ones (project page) */
export function Arrow({ dir, onClick, top, big = false }: { dir: 'l' | 'r'; onClick: () => void; top: string; big?: boolean }) {
  const pts = big ? (dir === 'l' ? '14,2 2.5,8 14,14' : '2,2 13.5,8 2,14') : (dir === 'l' ? '10,1.5 2,6 10,10.5' : '2,1.5 10,6 2,10.5');
  return (
    <button className={`arrow arrow--${dir} ${big ? 'arrow--big' : ''}`} style={{ top }} onClick={onClick} aria-label={dir === 'l' ? 'Previous' : 'Next'}>
      <svg viewBox={big ? '0 0 16 16' : '0 0 12 12'} aria-hidden>
        <polygon points={pts} fill="none" stroke="currentColor" strokeWidth={big ? 2 : 1.2} />
      </svg>
    </button>
  );
}
