import { logoMark } from './voxel';
import { TOOLS } from '../data';

const NAV = [
  { path: '/', label: 'Nexus' },
  { path: '/forge', label: 'Forge' },
  { path: '/plinth', label: 'Plinth' },
  { path: '/registry', label: 'Registry' },
];

export function mountHeader(root: HTMLElement) {
  root.innerHTML = `
    <div class="shell site-header__shell">
      <a class="brand" href="/" data-link aria-label="BloxdBase home">
        ${logoMark()}
        <span class="brand__text">
          <strong>BloxdBase</strong>
          <em>creator command center</em>
        </span>
      </a>

      <nav class="nav" aria-label="Primary">
        <div class="nav__track">
          <span class="nav__indicator" aria-hidden="true"></span>
          ${NAV.map(
            (item) =>
              `<a class="nav__link" href="${item.path}" data-link data-nav="${item.path}">${item.label}</a>`,
          ).join('')}
        </div>
      </nav>

      <div class="header__actions">
        <a class="btn btn--ghost btn--sm" href="${TOOLS.blocks.home}" target="_blank" rel="noopener">
          BloxdBlocks <span aria-hidden="true">↗</span>
        </a>
        <a class="btn btn--primary btn--sm" href="/forge" data-link>Launch Forge</a>
      </div>
    </div>
  `;

  const track = root.querySelector<HTMLElement>('.nav__track');
  const indicator = root.querySelector<HTMLElement>('.nav__indicator');
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-nav]'));
  if (!track || !indicator) return;

  let current = '/';

  const paint = () => {
    const active = links.find((link) => link.dataset.nav === current) ?? links[0];
    links.forEach((link) => link.classList.toggle('is-active', link === active));
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  };

  const setActive = (path: string) => {
    current = path;
    paint();
    requestAnimationFrame(paint);
  };

  setActive(location.pathname);
  window.addEventListener('resize', paint);
  document.addEventListener('route:change', (event) => {
    setActive((event as CustomEvent<{ path: string }>).detail.path);
  });
}
