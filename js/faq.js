export function initFaq() {
  const root = document.getElementById('faq');
  if (!root) return;
  const items = [...root.querySelectorAll('details')];
  if (!items.length) return;
  items.forEach((item, index) => {
    const summary = item.querySelector('summary');
    if (!summary) return;
    summary.dataset.faqTrigger = '';
    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', String(item.open));
    summary.setAttribute('aria-controls', `faq-panel-${index}`);
    const panel = summary.nextElementSibling;
    if (panel) panel.id = `faq-panel-${index}`;
  });
  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-faq-trigger]');
    if (!trigger) return;
    event.preventDefault();
    const item = trigger.parentElement;
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    items.forEach((entry) => { entry.open = false; entry.querySelector('[data-faq-trigger]')?.setAttribute('aria-expanded', 'false'); });
    if (willOpen) { item.open = true; trigger.setAttribute('aria-expanded', 'true'); }
  });
}
