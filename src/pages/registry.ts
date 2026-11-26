import { RESOURCES, type ResourceType } from '../data';

const FILTERS: Array<{ id: 'all' | ResourceType; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'logic', label: 'Logic' },
  { id: 'structure', label: 'Structure' },
  { id: 'asset', label: 'Asset' },
  { id: 'core', label: 'Core' },
];

export function renderRegistry(mount: HTMLElement) {
  const initial = new URLSearchParams(location.search).get('type') ?? 'all';
  const validInitial = FILTERS.some((filter) => filter.id === initial) ? initial : 'all';

  mount.innerHTML = `
    <section class="page page--registry">
      <header class="page__head" data-reveal>
        <div class="page__titles">
          <span class="eyebrow">View D / global registry</span>
          <h1 class="page__title">The Global Registry</h1>
          <p class="page__lede">
            Every external node in the BloxdBase grid — editors, studios, libraries and
            source — indexed in one searchable matrix.
          </p>
        </div>
        <div class="page__meta">
          <span class="chip"><span class="dot"></span>${RESOURCES.length} records indexed</span>
        </div>
      </header>

      <div class="registry">
        <div class="registry__bar" data-reveal>
          <span class="registry__prompt" aria-hidden="true">›</span>
          <label class="visually-hidden" for="registry-search">Search resources</label>
          <input
            id="registry-search"
            class="registry__input"
            type="search"
            placeholder="grep resources — try &quot;builder&quot;, &quot;docs&quot;, &quot;schematic&quot;"
            autocomplete="off"
            spellcheck="false"
            data-search
          />
          <span class="registry__count" data-count>${String(RESOURCES.length).padStart(2, '0')} / ${String(RESOURCES.length).padStart(2, '0')} RECORDS</span>
        </div>

        <div class="registry__chips" role="group" aria-label="Filter by type">
          ${FILTERS.map(
            (filter) => `
            <button type="button" class="chip-btn${filter.id === validInitial ? ' is-active' : ''}" data-filter="${filter.id}" aria-pressed="${filter.id === validInitial}">
              ${filter.label}
            </button>`,
          ).join('')}
        </div>

        <div class="matrix">
          <div class="matrix__head" aria-hidden="true">
            <span>Resource</span><span>Type</span><span>Source</span><span>Action</span>
          </div>
          <div class="matrix__body">
            ${RESOURCES.map((resource) => {
              const external = resource.url.startsWith('http');
              return `
              <a
                class="row"
                href="${resource.url}"
                ${external ? 'target="_blank" rel="noopener"' : 'data-link'}
                data-row
                data-type="${resource.type}"
                data-hay="${`${resource.name} ${resource.kind} ${resource.note} ${resource.tags} ${resource.source}`.toLowerCase()}"
              >
                <span class="row__main">
                  <span class="row__name">${resource.name}</span>
                  <span class="row__note">${resource.note}</span>
                </span>
                <span class="row__type"><i class="type-dot type-dot--${resource.type}"></i>${resource.type}</span>
                <span class="row__source">${resource.source}</span>
                <span class="row__action">${external ? 'Open ↗' : 'Enter →'}</span>
              </a>`;
            }).join('')}
          </div>
          <div class="matrix__empty" data-empty hidden>
            <span>NO RECORDS MATCH</span>
            <p>Adjust the query or clear the type filter to widen the scan.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const search = mount.querySelector<HTMLInputElement>('[data-search]');
  const count = mount.querySelector<HTMLElement>('[data-count]');
  const empty = mount.querySelector<HTMLElement>('[data-empty]');
  const chips = Array.from(mount.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const rows = Array.from(mount.querySelectorAll<HTMLAnchorElement>('[data-row]'));
  if (!search || !count || !empty) return;

  let filter = validInitial;

  const apply = () => {
    const query = search.value.trim().toLowerCase();
    let shown = 0;
    rows.forEach((row) => {
      const matchesType = filter === 'all' || row.dataset.type === filter;
      const matchesQuery = !query || (row.dataset.hay ?? '').includes(query);
      const visible = matchesType && matchesQuery;
      row.hidden = !visible;
      if (visible) shown += 1;
    });
    count.textContent = `${String(shown).padStart(2, '0')} / ${String(rows.length).padStart(2, '0')} RECORDS`;
    empty.hidden = shown > 0;
    chips.forEach((chip) => {
      const active = chip.dataset.filter === filter;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filter = (chip.dataset.filter ?? 'all') as typeof filter;
      apply();
    });
  });

  search.addEventListener('input', apply);
  apply();
}
