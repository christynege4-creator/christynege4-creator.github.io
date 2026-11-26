let observer: IntersectionObserver | null = null;

function observeReveals() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((node) => node.classList.add('is-in'));
    return;
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer?.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );
  }
  targets.forEach((node) => observer?.observe(node));

  // Safety net: never leave content hidden if the observer never fires.
  window.setTimeout(() => {
    document
      .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
      .forEach((node) => node.classList.add('is-in'));
  }, 2600);
}

/** Scanning beam that tracks the scroll position + scroll-reveal wiring. */
export function initEffects() {
  const beam = document.querySelector<HTMLElement>('.scan-beam');
  let frame = 0;

  const updateBeam = () => {
    frame = 0;
    if (!beam) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    beam.style.setProperty('--scan-progress', progress.toFixed(4));
    beam.classList.toggle('is-scrolling', progress > 0.01 && progress < 0.99);
  };

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(updateBeam);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateBeam();

  document.addEventListener('route:change', () => {
    window.setTimeout(() => {
      observeReveals();
      updateBeam();
    }, 20);
  });

  observeReveals();
  window.setTimeout(updateBeam, 60);
}
