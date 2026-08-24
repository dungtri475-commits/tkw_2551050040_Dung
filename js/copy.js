export function initCopyEmail() {
  const button = document.querySelector('[data-copy-email]');
  if (!button || !navigator.clipboard) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      button.textContent = 'Đã sao chép';
      setTimeout(() => { button.textContent = 'Sao chép email'; }, 1800);
    } catch {
      button.textContent = 'Không thể sao chép';
    }
  });
}
