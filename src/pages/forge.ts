import { LOGIC_NODES, TERMINAL_COMMANDS, TOOLS } from '../data';
import { copyText, toast } from '../components/toast';

export function renderForge(mount: HTMLElement) {
  mount.innerHTML = `
    <section class="page page--forge">
      <header class="page__head" data-reveal>
        <div class="page__titles">
          <span class="eyebrow">View B / logic forge</span>
          <h1 class="page__title">The Logic Forge</h1>
          <p class="page__lede">
            A three-pane workbench: pull a logic cartridge from the rail, wire it in the
            live BloxdBlocks workspace, then lift the exact JavaScript out of the
            terminal.
          </p>
        </div>
        <div class="page__meta">
          <span class="chip chip--teal"><span class="dot"></span>Engine online</span>
          <a class="btn btn--ghost btn--sm" href="${TOOLS.blocks.url}" target="_blank" rel="noopener">
            Open full editor <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div class="workbench" data-reveal>
        <aside class="rail" aria-label="Logic nodes">
          <div class="rail__head">
            <span>Logic nodes</span>
            <span class="rail__count">${String(LOGIC_NODES.length).padStart(2, '0')}</span>
          </div>
          <div class="rail__list">
            ${LOGIC_NODES.map(
              (node) => `
              <button class="node" type="button" data-node="${node.id}">
                <span class="node__cat node__cat--${node.category.toLowerCase()}">${node.category}</span>
                <span class="node__name">${node.name}</span>
                <span class="node__detail">${node.detail}</span>
                <span class="node__action">Insert &amp; copy</span>
              </button>`,
            ).join('')}
          </div>
        </aside>

        <section class="frame" aria-label="BloxdBlocks workspace">
          <div class="frame__bar">
            <span class="frame__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="frame__url">christynege4-creator.github.io/bloxdblocks2/bloxdcodetool.html</span>
            <a class="frame__open" href="${TOOLS.blocks.url}" target="_blank" rel="noopener" aria-label="Open BloxdBlocks in a new tab">↗</a>
          </div>
          <div class="frame__viewport">
            <iframe
              title="BloxdBlocks visual code editor"
              src="${TOOLS.blocks.url}"
              loading="lazy"
              referrerpolicy="no-referrer"
            ></iframe>
          </div>
          <div class="frame__foot">
            <span>EMBEDDED · LIVE</span>
            <span>BLOCKSDOCS v7.0</span>
            <span>${TOOLS.blocks.docs.replace('https://', '')}</span>
          </div>
        </section>

        <aside class="terminal" aria-label="Documentation terminal">
          <div class="rail__head">
            <span>Documentation</span>
            <span class="rail__count">REF</span>
          </div>
          <p class="terminal__hint">
            Click a command to copy it. Snippets are reference shapes — confirm
            signatures in the
            <a href="${TOOLS.blocks.docs}" target="_blank" rel="noopener">BloxdBlocks docs</a>.
          </p>
          <div class="terminal__list">
            ${TERMINAL_COMMANDS.map(
              (command) => `
              <button class="command" type="button" data-copy-id="${command.id}">
                <span class="command__row">
                  <span class="command__name">${command.name}</span>
                  <span class="command__copy" aria-hidden="true">copy</span>
                </span>
                <code class="command__sig">${command.signature}</code>
                <span class="command__note">${command.note}</span>
              </button>`,
            ).join('')}
          </div>
          <div class="console" aria-live="polite" aria-label="Terminal output">
            <div class="console__head"><span>Console</span><span class="dot"></span></div>
            <div class="console__body" data-console></div>
          </div>
        </aside>
      </div>
    </section>
  `;

  const consoleBody = mount.querySelector<HTMLElement>('[data-console]');
  const pushLine = (label: string, code?: string) => {
    if (!consoleBody) return;
    const line = document.createElement('div');
    line.className = 'console__line';

    const time = document.createElement('span');
    time.className = 'console__time';
    time.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });

    const arrow = document.createElement('span');
    arrow.className = 'console__arrow';
    arrow.textContent = '›';

    const text = document.createElement('span');
    text.className = 'console__text';
    text.textContent = label;

    line.append(time, arrow, text);

    if (code) {
      const codeNode = document.createElement('code');
      codeNode.className = 'console__code';
      codeNode.textContent = code;
      line.append(codeNode);
    }

    consoleBody.prepend(line);
    while (consoleBody.children.length > 4) consoleBody.lastElementChild?.remove();
  };

  mount.querySelectorAll<HTMLButtonElement>('[data-node]').forEach((button) => {
    button.addEventListener('click', async () => {
      const node = LOGIC_NODES.find((item) => item.id === button.dataset.node);
      if (!node) return;
      const copied = await copyText(node.snippet);
      button.classList.add('is-copied');
      window.setTimeout(() => button.classList.remove('is-copied'), 1000);
      if (copied) {
        pushLine(`${node.name} → snippet copied to clipboard`);
        toast(`${node.name} copied to clipboard`);
      } else {
        pushLine(`${node.name} → clipboard unavailable · manual copy:`, node.snippet);
        toast('Clipboard blocked — snippet printed in the console');
      }
    });
  });

  mount.querySelectorAll<HTMLButtonElement>('[data-copy-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const command = TERMINAL_COMMANDS.find((item) => item.id === button.dataset.copyId);
      if (!command) return;
      const copied = await copyText(command.signature);
      button.classList.add('is-copied');
      window.setTimeout(() => button.classList.remove('is-copied'), 1000);
      if (copied) {
        pushLine(`${command.name} → copied to clipboard`);
        toast(`${command.name} copied`);
      } else {
        pushLine(`${command.name} → clipboard unavailable · manual copy:`, command.signature);
        toast('Clipboard blocked — signature printed in the console');
      }
    });
  });

  pushLine('terminal initialised · bloxdblocks bridge ready');
}
