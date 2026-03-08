export function initThoughtOverlay({
  overlayId = 'thoughtOverlay',
  closeId = 'thoughtClose',
  startOpen = true,
} = {}) {
  const overlay = document.getElementById(overlayId);
  const closeButton = document.getElementById(closeId);

  if (!overlay) {
    return {
      open: () => {},
      close: () => {},
      closeMenu: () => {},
      isOpen: () => false,
      isMenuOpen: () => false,
    };
  }

  let isOpenState = Boolean(startOpen);

  const sync = () => {
    overlay.hidden = !isOpenState;
    document.body.classList.toggle('thought-overlay-open', isOpenState);
  };

  const open = () => {
    isOpenState = true;
    sync();
  };

  const close = () => {
    isOpenState = false;
    sync();
  };

  closeButton?.addEventListener('click', close);

  overlay.addEventListener('pointerdown', (event) => {
    if (event.target === overlay) close();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (isOpenState) close();
  });

  sync();

  return {
    open,
    close,
    closeMenu: () => {},
    isOpen: () => isOpenState,
    isMenuOpen: () => false,
  };
}
