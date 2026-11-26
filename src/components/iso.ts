type LayerId = 'terrain' | 'structures' | 'props';

type Block = { i: number; j: number; z: number; layer: LayerId };

const PALETTE: Record<LayerId, { top: string; left: string; right: string; stroke: string }> = {
  terrain: { top: '#1B2231', left: '#141A27', right: '#0E131D', stroke: 'rgba(0,255,194,0.16)' },
  structures: { top: '#FF9A54', left: '#FF5C00', right: '#A93900', stroke: 'rgba(255,92,0,0.35)' },
  props: { top: '#F4F4F9', left: '#C9CEDF', right: '#7E8598', stroke: 'rgba(244,244,249,0.22)' },
};

const TILE_W = 44;
const TILE_H = 22;
const BLOCK_H = 28;
const CENTER_X = 310;
const BASE_Y = 150;

function buildBlocks(): Block[] {
  const blocks: Block[] = [];
  const size = 7;

  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      blocks.push({ i, j, z: 0, layer: 'terrain' });
    }
  }

  const towers: Array<[number, number, number]> = [
    [2, 2, 4],
    [3, 2, 2],
    [2, 3, 3],
    [4, 4, 2],
    [1, 4, 1],
  ];
  towers.forEach(([i, j, height]) => {
    for (let z = 1; z <= height; z += 1) blocks.push({ i, j, z, layer: 'structures' });
  });

  const props: Array<[number, number]> = [
    [5, 1],
    [1, 6],
    [6, 5],
    [5, 6],
  ];
  props.forEach(([i, j]) => blocks.push({ i, j, z: 1, layer: 'props' }));

  return blocks;
}

function face(cx: number, cy: number, layer: LayerId) {
  const p = PALETTE[layer];
  const w = TILE_W / 2;
  const h = TILE_H / 2;
  return [
    `<polygon points="${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}" fill="${p.top}" stroke="${p.stroke}" stroke-width="0.6"/>`,
    `<polygon points="${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + BLOCK_H} ${cx - w},${cy + BLOCK_H}" fill="${p.left}" stroke="${p.stroke}" stroke-width="0.6"/>`,
    `<polygon points="${cx},${cy + h} ${cx + w},${cy} ${cx + w},${cy + BLOCK_H} ${cx},${cy + h + BLOCK_H}" fill="${p.right}" stroke="${p.stroke}" stroke-width="0.6"/>`,
  ].join('');
}

/** Isometric voxel stage for the Architect's Plinth. */
export function isoScene(): string {
  const blocks = buildBlocks().sort((a, b) => {
    if (a.i + a.j !== b.i + b.j) return a.i + a.j - (b.i + b.j);
    return b.z - a.z;
  });

  const groups: Record<LayerId, string[]> = { terrain: [], structures: [], props: [] };

  blocks.forEach((block) => {
    const cx = CENTER_X + (block.i - block.j) * (TILE_W / 2);
    const cy = BASE_Y + (block.i + block.j) * (TILE_H / 2) - block.z * BLOCK_H;
    groups[block.layer].push(face(cx, cy, block.layer));
  });

  return `<svg class="iso" viewBox="0 0 620 400" role="img" aria-label="Isometric voxel build preview">
    <g class="iso__float">
      ${(Object.keys(groups) as LayerId[])
        .map(
          (layer) =>
            `<g data-layer-group="${layer}" class="iso__layer iso__layer--${layer}">${groups[layer].join('')}</g>`,
        )
        .join('')}
    </g>
  </svg>`;
}
