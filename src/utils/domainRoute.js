import { DOMAIN_ROUTES } from '../domains';

// '/code/whatever' -> 'code'; '/' or an unknown path -> null.
export function pathToDomain(pathname) {
    const segment = pathname.replace(/^\/+/, '').split('/')[0];
    return DOMAIN_ROUTES[segment] || null;
}

// Plain History API push, no router dependency. No-op if the browser is
// already on the target path — keeps this safe to call from a popstate
// handler (the URL has already changed by the time popstate fires) without
// pushing a duplicate history entry that would break back/forward.
export function pushDomainRoute(route) {
    const target = `/${route}`;
    if (window.location.pathname === target) return;
    window.history.pushState(null, '', target);
}
