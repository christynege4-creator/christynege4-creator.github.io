import { logoMark } from './voxel';
import { TOOLS } from '../data';

type TreeRow = {
  glyph: string;
  label: string;
  desc: string;
  href: string;
  external?: boolean;
  indent?: number;
};

const TREE: TreeRow[] = [
  { glyph: '/', label: 'bloxdbase', desc: 'command center', href: '/' },
  { glyph: '├──', label: 'forge/', desc: 'bloxdblocks · logic engine', href: '/forge', indent: 1 },
  { glyph: '│   ├──', label: 'nodes/', desc: '07 cartridges online', href: '/forge', indent: 2 },
  { glyph: '│   └──', label: 'terminal/', desc: 'reference commands', href: '/forge', indent: 2 },
  { glyph: '├──', label: 'plinth/', desc: 'bloxdbuilder · world studio', href: '/plinth', indent: 1 },
  { glyph: '│   ├──', label: 'layers/', desc: 'terrain · structures · props', href: '/plinth', indent: 2 },
  { glyph: '│   └──', label: 'deploy/', desc: 'export to bloxd', href: '/plinth', indent: 2 },
  { glyph: '├──', label: 'registry/', desc: 'global resource index', href: '/registry', indent: 1 },
  { glyph: '└──', label: 'external/', desc: 'off-station nodes', href: '/registry', indent: 1 },
];

const EXTERNAL = [
  { label: 'BloxdBlocks editor', href: TOOLS.blocks.url },
  { label: 'BloxdBlocks docs', href: TOOLS.blocks.docs },
  { label: 'BloxdBuilder', href: TOOLS.builder.url },
  { label: 'Bloxd.io', href: TOOLS.bloxd.url },
  { label: 'Creator GitHub', href: 'https://github.com/christynege4-creator' },
  { label: 'Community Discord', href: 'https://discord.gg/S4mRRsERD' },
];

export function mountFooter(root: HTMLElement) {
  root.innerHTML = `
    <div class="shell footer__grid">
      <div class="footer__col footer__col--brand">
        <a class="brand" href="/" data-link aria-label="BloxdBase home">
          ${logoMark()}
          <span class="brand__text">
            <strong>BloxdBase</strong>
            <em>structural synapse</em>
          </span>
        </a>
        <p class="footer__note">
          The command center for Bloxd.io creation. One station, two engines,
          every resource on the grid.
        </p>
        <div class="footer__status"><span class="dot"></span> All systems nominal</div>
      </div>

      <div class="footer__col footer__col--tree">
        <span class="footer__label">Site map / blueprint</span>
        <div class="tree">
          ${TREE.map(
            (row) => `
            <div class="tree__row" style="--indent:${row.indent ?? 0}">
              <span class="tree__glyph" aria-hidden="true">${row.glyph}</span>
              <a class="tree__link" href="${row.href}" data-link>${row.label}</a>
              <em class="tree__desc">${row.desc}</em>
            </div>`,
          ).join('')}
        </div>
      </div>

      <div class="footer__col footer__col--links">
        <span class="footer__label">External nodes</span>
        <ul class="footer__links">
          ${EXTERNAL.map(
            (item) =>
              `<li><a href="${item.href}" target="_blank" rel="noopener">${item.label} <span aria-hidden="true">↗</span></a></li>`,
          ).join('')}
        </ul>
        <div class="footer__readout">
          <div><span>Build</span><strong>v2.6.0</strong></div>
          <div><span>Node</span><strong>EU-WEST / 01</strong></div>
          <div><span>Latency</span><strong>18 ms</strong></div>
        </div>
      </div>
    </div>

    <div class="shell footer__base">
      <span>© 2026 BloxdBase</span>
      <span>Structural Synapse · Obsidian Blueprint</span>
      <span>Made for creators, not consumers</span>
    </div>
  `;
}
