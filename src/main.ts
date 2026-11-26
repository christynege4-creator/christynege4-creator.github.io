import '../index.css';
import './styles/pages.css';
import { mountHeader } from './components/header';
import { mountFooter } from './components/footer';
import { initEffects } from './components/effects';
import { createRouter } from './router';
import { renderHome } from './pages/home';
import { renderForge } from './pages/forge';
import { renderPlinth } from './pages/plinth';
import { renderRegistry } from './pages/registry';

const header = document.getElementById('site-header');
const footer = document.getElementById('site-footer');
if (header) mountHeader(header);
if (footer) mountFooter(footer);

function renderNotFound(mount: HTMLElement) {
  mount.innerHTML = `
    <section class="page page--missing">
      <span class="eyebrow">Signal lost</span>
      <h1 class="page__title">404 / No node at this address</h1>
      <p class="page__lede">The grid has no record of this route. Re-enter through the nexus.</p>
      <div class="cta__actions">
        <a class="btn btn--primary" href="/" data-link>Return to Nexus</a>
        <a class="btn btn--ghost" href="/registry" data-link>Open Registry</a>
      </div>
    </section>
  `;
}

const router = createRouter(
  [
    { path: '/', title: 'BloxdBase — Bloxd.io Creator Command Center', render: renderHome },
    { path: '/forge', title: 'The Logic Forge — BloxdBase', render: renderForge },
    { path: '/plinth', title: "The Architect's Plinth — BloxdBase", render: renderPlinth },
    { path: '/registry', title: 'The Global Registry — BloxdBase', render: renderRegistry },
  ],
  { path: '*', title: 'Signal lost — BloxdBase', render: renderNotFound },
);

initEffects();
router.init();
router.start();
