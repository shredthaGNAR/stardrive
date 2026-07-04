import { onCleanup, onMount } from 'solid-js';

const IntegrationListModal = () => {
  const getFocusable = () => {
    const el = document.getElementById('integration-list-modal');
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'));
  };

  const trapFocus = (event: KeyboardEvent) => {
    const modal = document.getElementById('integration-list-modal');
    if (!modal || modal.classList.contains('hidden')) return;
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

  const openModal = () => {
    const modal = document.getElementById('integration-list-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('fixed');
    document.body.classList.add('overflow-y-hidden');
    // Focus the first focusable element inside the modal
    const focusable = getFocusable();
    focusable.at(0)?.focus();
  };

  const closeModal = () => {
    const modal = document.getElementById('integration-list-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    modal.classList.remove('fixed');
    document.body.classList.remove('overflow-y-hidden');
    (document.getElementById('open-integration-list') as HTMLElement | null)?.focus();
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  };

  const setupModal = () => {
    document.getElementById('open-integration-list')?.addEventListener('click', openModal);
    document.getElementById('close-integration-list')?.addEventListener('click', closeModal);
    document.addEventListener('keyup', handleKeyup);
    document.addEventListener('keydown', trapFocus);
  };

  const cleanupModal = () => {
    document.getElementById('open-integration-list')?.removeEventListener('click', openModal);
    document.getElementById('close-integration-list')?.removeEventListener('click', closeModal);
    document.removeEventListener('keyup', handleKeyup);
    document.removeEventListener('keydown', trapFocus);
  };

  const handleAfterSwap = () => {
    cleanupModal();
    setupModal();
  };

  onMount(() => {
    setupModal();
    document.addEventListener('astro:after-swap', handleAfterSwap);
  });

  onCleanup(() => {
    cleanupModal();
    document.removeEventListener('astro:after-swap', handleAfterSwap);
  });

  return null;
};

export default IntegrationListModal;
