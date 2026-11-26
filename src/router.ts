export type RouteView = {
  path: string;
  title: string;
  render: (mount: HTMLElement) => void;
};

type Router = {
  init: () => void;
  start: () => void;
  go: (path: string) => void;
};

export function createRouter(routes: RouteView[], fallback: RouteView): Router {
  const resolve = (url: string): RouteView => {
    const pathname = url.split('?')[0];
    return routes.find((route) => route.path === pathname) ?? fallback;
  };

  const render = (url: string, push: boolean) => {
    const mount = document.getElementById('app');
    if (!mount) return;
    const route = resolve(url);
    mount.innerHTML = '';
    route.render(mount);
    document.title = route.title;
    if (push) history.pushState({}, '', url);
    window.scrollTo(0, 0);
    document.dispatchEvent(
      new CustomEvent('route:change', { detail: { path: url.split('?')[0] } }),
    );
  };

  const onDocumentClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const target = event.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>('a[data-link]');
    if (!link) return;
    const url = new URL(link.href, location.origin);
    if (url.origin !== location.origin) return;
    event.preventDefault();
    render(url.pathname + url.search, true);
  };

  return {
    init() {
      document.addEventListener('click', onDocumentClick);
      window.addEventListener('popstate', () => render(location.pathname + location.search, false));
    },
    start() {
      render(location.pathname + location.search, false);
    },
    go(path: string) {
      render(path, true);
    },
  };
}
