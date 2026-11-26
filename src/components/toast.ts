let hideTimer: number | undefined;

// A toast belongs to the view that raised it — clear it when the route changes.
document.addEventListener('route:change', () => {
  document.getElementById('toast')?.classList.remove('is-visible');
  if (hideTimer) window.clearTimeout(hideTimer);
});

export function toast(message: string) {
  const node = document.getElementById('toast');
  if (!node) return;
  node.textContent = message;
  node.classList.add('is-visible');
  if (hideTimer) window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(() => node.classList.remove('is-visible'), 2400);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
