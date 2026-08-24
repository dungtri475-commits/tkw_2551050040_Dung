export function initNav() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  const header = document.querySelector('header');
  if (!toggle || !menu || !header) return;
  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    document.body.classList.toggle('overflow-hidden', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); } });
  document.addEventListener('click', (event) => { if (!header.contains(event.target)) setOpen(false); });
  matchMedia('(min-width: 1024px)').addEventListener('change', (event) => { if (event.matches) setOpen(false); });
}

export function initHeaderOnScroll() {
  const header = document.querySelector('header');
  const sentinel = document.getElementById('nav-sentinel');
  if (!header || !sentinel || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => header.classList.toggle('shadow-sm', !entry.isIntersecting)).observe(sentinel);
}

export function initToTop() {
  const button = document.querySelector('[data-to-top]');
  if (!button) return;
  const sentinel = document.querySelector('[data-to-top-sentinel]');
  if (!sentinel || !('IntersectionObserver' in window)) return;
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  new IntersectionObserver(([entry]) => button.hidden = entry.boundingClientRect.top > -400).observe(sentinel);
}
