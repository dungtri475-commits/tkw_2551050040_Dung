export function initPricing() {
  const toggle = document.querySelector('[data-price-toggle]');
  const prices = [...document.querySelectorAll('[data-price]')];
  if (!toggle || !prices.length) return;
  const dong = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
  const render = (yearly) => {
    prices.forEach((el) => el.textContent = dong.format(Number(el.dataset[yearly ? 'yearly' : 'monthly'])));
    document.querySelectorAll('.price-period').forEach((el) => el.textContent = yearly ? '/năm' : '/tháng');
    toggle.setAttribute('aria-checked', String(yearly));
  };
  toggle.addEventListener('click', () => render(toggle.getAttribute('aria-checked') !== 'true'));
  toggle.addEventListener('keydown', (event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); toggle.click(); } });
  render(false);
}
