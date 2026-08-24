export function initTheme() {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;
  const sync = () => {
    const dark = document.documentElement.classList.contains('dark');
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  };
  sync();
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    sync();
  });
}
