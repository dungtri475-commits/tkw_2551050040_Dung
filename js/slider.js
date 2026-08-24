export function initSlider() {
  const root = document.querySelector('[data-slider]');
  if (!root) return;
  const track = root.querySelector('[data-slider-track]'); const slides = [...root.querySelectorAll('[data-slide]')]; const dots = root.querySelector('[data-slider-dots]');
  if (!track || slides.length < 2 || !dots) return;
  let index = 0; let timer;
  const go = (next) => { index = (next + slides.length) % slides.length; track.style.transform = `translateX(-${index * 100}%)`; slides.forEach((slide, i) => slide.toggleAttribute('inert', i !== index)); [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === index))); };
  slides.forEach((_, i) => { const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'slider-dot'; dot.setAttribute('aria-label', `Xem cảm nhận ${i + 1}`); dot.addEventListener('click', () => go(i)); dots.append(dot); });
  root.querySelector('[data-slider-prev]')?.addEventListener('click', () => go(index - 1)); root.querySelector('[data-slider-next]')?.addEventListener('click', () => go(index + 1));
  const stop = () => clearInterval(timer); const start = () => { stop(); timer = setInterval(() => go(index + 1), 5000); };
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start); root.addEventListener('focusin', stop); root.addEventListener('focusout', start); document.addEventListener('visibilitychange', () => document.hidden ? stop() : start()); go(0); start();
}
