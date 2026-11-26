import { LAYERS, TOOLS } from '../data';
import { isoScene } from '../components/iso';
import { toast } from '../components/toast';

export function renderPlinth(mount: HTMLElement) {
  mount.innerHTML = `
    <section class="page page--plinth">
      <header class="page__head" data-reveal>
        <div class="page__titles">
          <span class="eyebrow">View C / architect's plinth</span>
          <h1 class="page__title">The Architect's Plinth</h1>
          <p class="page__lede">
            A full-bleed construction stage. Toggle the layer stack, switch between
            blueprint and render, then deploy a validated build into BloxdBuilder.
          </p>
        </div>
        <div class="page__meta">
          <span class="chip chip--orange"><span class="dot"></span>Grid 1:1</span>
          <a class="btn btn--ghost btn--sm" href="${TOOLS.builder.url}" target="_blank" rel="noopener">
            Open BloxdBuilder <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div class="studio" data-studio data-mode="render" data-reveal>
        <aside class="layers" aria-label="Layer stack">
          <div class="rail__head">
            <span>Layer stack</span>
            <span class="rail__count">05</span>
          </div>
          <div class="layers__list">
            ${LAYERS.map(
              (layer) => `
              <label class="layer">
                <input type="checkbox" data-layer="${layer.id}" ${layer.id === 'scripts' ? '' : 'checked'} />
                <span class="layer__switch" aria-hidden="true"><i></i></span>
                <span class="layer__text">
                  <strong>${layer.name}</strong>
                  <em>${layer.note}</em>
                </span>
              </label>`,
            ).join('')}
          </div>
          <div class="layers__foot">
            <span class="layers__label">Build integrity</span>
            <span class="layers__status" data-deploy-status>BUILD VALID · DEPLOY READY</span>
          </div>
        </aside>

        <div class="stage">
          <div class="stage__toolbar">
            <div class="mode" role="group" aria-label="Viewport mode">
              <button type="button" class="mode__btn" data-mode-btn="blueprint" aria-pressed="false">Blueprint</button>
              <button type="button" class="mode__btn is-active" data-mode-btn="render" aria-pressed="true">Render</button>
            </div>
            <div class="stage__readout">
              <span>SEED 0x2F4A</span>
              <span>49 TILES</span>
              <span>ISO 30°</span>
            </div>
          </div>

          <div class="stage__scene" data-scene>
            <div class="stage__glow" aria-hidden="true"></div>
            <div class="stage__scan" aria-hidden="true"></div>
            <div class="stage__art" data-art></div>
          </div>

          <div class="stage__hud">
            <span>X 0.00 · Y 0.00 · Z 0.00</span>
            <span class="stage__hud-live"><span class="dot"></span>Viewport live</span>
          </div>

          <a class="deploy" data-deploy href="${TOOLS.builder.url}" target="_blank" rel="noopener">
            <span class="deploy__label">Deploy to Bloxd</span>
            <span class="deploy__meta">export · .bb build</span>
          </a>
        </div>
      </div>
    </section>
  `;

  const studio = mount.querySelector<HTMLElement>('[data-studio]');
  const art = mount.querySelector<HTMLElement>('[data-art]');
  const deploy = mount.querySelector<HTMLAnchorElement>('[data-deploy]');
  const status = mount.querySelector<HTMLElement>('[data-deploy-status]');
  if (!studio || !art || !deploy || !status) return;

  art.innerHTML = isoScene();
  let valid = true;

  const sync = () => {
    const enabled = new Set(
      Array.from(studio.querySelectorAll<HTMLInputElement>('[data-layer]'))
        .filter((input) => input.checked)
        .map((input) => input.dataset.layer ?? ''),
    );

    studio.querySelectorAll<SVGGElement>('[data-layer-group]').forEach((group) => {
      group.style.display = enabled.has(group.dataset.layerGroup ?? '') ? '' : 'none';
    });
    studio.classList.toggle('is-unlit', !enabled.has('lighting'));
    studio.classList.toggle('is-scripted', enabled.has('scripts'));

    valid = enabled.has('terrain') && enabled.has('structures');
    deploy.classList.toggle('is-valid', valid);
    deploy.classList.toggle('is-blocked', !valid);
    deploy.setAttribute('aria-disabled', String(!valid));
    status.textContent = valid
      ? 'BUILD VALID · DEPLOY READY'
      : 'INVALID · ENABLE TERRAIN + STRUCTURES';
    status.classList.toggle('is-invalid', !valid);
  };

  studio.querySelectorAll<HTMLInputElement>('[data-layer]').forEach((input) => {
    input.addEventListener('change', sync);
  });

  studio.querySelectorAll<HTMLButtonElement>('[data-mode-btn]').forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.modeBtn ?? 'render';
      studio.dataset.mode = mode;
      studio
        .querySelectorAll<HTMLButtonElement>('[data-mode-btn]')
        .forEach((other) => {
          const active = other === button;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-pressed', String(active));
        });
    });
  });

  deploy.addEventListener('click', (event) => {
    if (valid) return;
    event.preventDefault();
    toast('Build invalid — enable terrain and structures first');
  });

  sync();
}
