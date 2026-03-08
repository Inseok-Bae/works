export function initThoughtOverlay({
  overlayId = 'thoughtOverlay',
  closeId = 'thoughtClose',
  menuToggleId = 'thoughtMenuToggle',
  menuId = 'thoughtMenu',
  openActionId = 'thoughtActionOpen',
  indexActionId = 'thoughtActionIndex',
  indexHref = '../index.html',
  startOpen = true,
} = {}) {
  const overlay = document.getElementById(overlayId);
  const closeButton = document.getElementById(closeId);
  const menuToggleButton = document.getElementById(menuToggleId);
  const menu = document.getElementById(menuId);
  const openAction = document.getElementById(openActionId);
  const indexAction = document.getElementById(indexActionId);

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

    if (menuToggleButton) {
      // The artwork utility menu now behaves like a fixed section navigator.
      menuToggleButton.hidden = true;
      menuToggleButton.setAttribute('aria-expanded', 'false');
    }

    if (menu) {
      menu.hidden = isOpenState;
    }

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

  const closeMenu = () => {
    // Menu is always visible while the overlay is closed.
  };

  closeButton?.addEventListener('click', close);

  openAction?.addEventListener('click', () => {
    open();
  });

  if (indexAction) {
    if (indexAction.tagName === 'A') {
      const href = indexAction.getAttribute('href');
      if (!href || href.length === 0) {
        indexAction.setAttribute('href', indexHref);
      }
    } else {
      indexAction.addEventListener('click', () => {
        window.location.href = indexHref;
      });
    }
  }

  overlay.addEventListener('pointerdown', (event) => {
    if (event.target === overlay) close();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (isOpenState) {
      close();
    }
  });

  sync();

  return {
    open,
    close,
    closeMenu,
    isOpen: () => isOpenState,
    isMenuOpen: () => !isOpenState && Boolean(menu) && !menu.hidden,
  };
}
