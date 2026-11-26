export type Accent = 'teal' | 'orange' | 'ghost';

const PALETTES: Record<Accent, { top: string; left: string; right: string }> = {
  teal: { top: '#7CFFDF', left: '#00D6A3', right: '#007E5E' },
  orange: { top: '#FFB27A', left: '#FF7A2E', right: '#A93900' },
  ghost: { top: '#F4F4F9', left: '#C9CEDF', right: '#7E8598' },
};

function cube(cx: number, cy: number, size: number, palette: { top: string; left: string; right: string }) {
  const w = size;
  const h = size * 0.5;
  const d = size * 0.85;
  return [
    `<polygon points="${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}" fill="${palette.top}"/>`,
    `<polygon points="${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + d} ${cx - w},${cy + d}" fill="${palette.left}"/>`,
    `<polygon points="${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + d} ${cx},${cy + h + d}" fill="${palette.right}"/>`,
  ].join('');
}

/** Isometric voxel cluster used as card artwork. */
export function voxelArt(accent: Accent): string {
  const p = PALETTES[accent];
  const faces = [
    cube(100, 84, 20, p),
    cube(134, 96, 34, p),
    cube(100, 112, 34, p),
    cube(118, 142, 34, p),
  ].join('');
  return `<svg class="voxel" viewBox="0 0 240 200" aria-hidden="true" focusable="false">${faces}</svg>`;
}

/** The BloxdBase mark: a two-tone voxel cube. */
export function logoMark(className = 'brand__mark'): string {
  return `<svg class="${className}" viewBox="0 0 40 44" aria-hidden="true" focusable="false">
    <polygon points="20,1 38,11 20,21 2,11" fill="#00FFC2"/>
    <polygon points="2,11 20,21 20,43 2,33" fill="#0A5E4C"/>
    <polygon points="38,11 20,21 20,43 38,33" fill="#FF5C00"/>
  </svg>`;
}
