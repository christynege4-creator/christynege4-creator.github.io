const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const format = (value: number) => Math.round(value).toLocaleString('en-US');

/** Count up from zero, then drift slowly so the readout feels live. */
export function startCounter(node: HTMLElement, target: number) {
  if (prefersReducedMotion()) {
    node.textContent = format(target);
    return;
  }

  const duration = 1500;
  const start = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = format(target * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    node.textContent = format(target);
    drift(node, target);
  };

  requestAnimationFrame(step);
}

function drift(node: HTMLElement, base: number) {
  let value = base;
  const loop = () => {
    value += Math.ceil(Math.random() * 4);
    node.textContent = format(value);
    node.classList.add('is-tick');
    window.setTimeout(() => node.classList.remove('is-tick'), 280);
    window.setTimeout(loop, 3400 + Math.random() * 2600);
  };
  window.setTimeout(loop, 2600);
}
