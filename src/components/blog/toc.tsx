import { onCleanup, onMount } from 'solid-js';

const Toc = () => {
  const getFocusable = () => {
    const el = document.getElementById('toc-overlay');
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  };

  const trapFocus = (event: KeyboardEvent) => {
    const tocOverlay = document.getElementById('toc-overlay');
    if (!tocOverlay || tocOverlay.classList.contains('hidden')) return;
    if (event.key !== 'Tab') return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    event.preventDefault();
    const current = document.activeElement;
    const index = focusable.indexOf(current as HTMLElement);
    if (event.shiftKey) {
      const prev = index <= 0 ? focusable.length - 1 : index - 1;
      focusable.at(prev)?.focus();
    } else {
      const next = index === -1 || index === focusable.length - 1 ? 0 : index + 1;
      focusable.at(next)?.focus();
    }
  };

  const openToC = () => {
    const tocOverlay = document.getElementById('toc-overlay');
    if (tocOverlay) {
      tocOverlay.classList.remove('hidden');
      tocOverlay.classList.add('fixed');
      document.body.classList.add('overflow-y-hidden');
      // Focus the first focusable element inside the overlay
      const focusable = getFocusable();
      focusable.at(0)?.focus();
    }
  };

  const closeToC = () => {
    const tocOverlay = document.getElementById('toc-overlay');
    if (!tocOverlay || tocOverlay.classList.contains('hidden')) return;
    tocOverlay.classList.add('hidden');
    tocOverlay.classList.remove('fixed');
    document.body.classList.remove('overflow-y-hidden');
    (document.getElementById('open-toc') as HTMLElement | null)?.focus();
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeToC();
  };

  const setupToC = () => {
    document.getElementById('open-toc')?.addEventListener('click', openToC);
    document.getElementById('close-toc')?.addEventListener('click', closeToC);
    document.addEventListener('keyup', handleKeyup);
    document.addEventListener('keydown', trapFocus);
    document.querySelectorAll('.toc-link').forEach((link) => link.addEventListener('click', closeToC));
  };

  const cleanupToC = () => {
    document.getElementById('open-toc')?.removeEventListener('click', openToC);
    document.getElementById('close-toc')?.removeEventListener('click', closeToC);
    document.removeEventListener('keyup', handleKeyup);
    document.removeEventListener('keydown', trapFocus);
    document.querySelectorAll('.toc-link').forEach((link) => link.removeEventListener('click', closeToC));
  };

  const handleAfterSwap = () => {
    cleanupToC();
    setupToC();
  };

  onMount(() => {
    setupToC();
    document.addEventListener('astro:after-swap', handleAfterSwap);
  });

  onCleanup(() => {
    cleanupToC();
    document.removeEventListener('astro:after-swap', handleAfterSwap);
  });

  return null;
};

export default Toc;
