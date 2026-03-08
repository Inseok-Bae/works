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
  let isMenuOpenState = false;

  const sync = () => {
    overlay.hidden = !isOpenState;

    if (menuToggleButton) {
      menuToggleButton.hidden = isOpenState;
      menuToggleButton.setAttribute('aria-expanded', String(!isOpenState && isMenuOpenState));
    }

    if (menu) {
      menu.hidden = isOpenState || !isMenuOpenState;
    }

    document.body.classList.toggle('thought-overlay-open', isOpenState);
  };

  const open = () => {
    isOpenState = true;
    isMenuOpenState = false;
    sync();
  };

  const close = () => {
    isOpenState = false;
    sync();
  };

  const closeMenu = () => {
    if (!isMenuOpenState) return;
    isMenuOpenState = false;
    sync();
  };

  const toggleMenu = () => {
    if (isOpenState) return;
    isMenuOpenState = !isMenuOpenState;
    sync();
  };

  closeButton?.addEventListener('click', close);
  menuToggleButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

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

  document.addEventListener('pointerdown', (event) => {
    if (!isMenuOpenState || !menu || !menuToggleButton) return;
    const target = event.target;
    if (menu.contains(target) || menuToggleButton.contains(target)) return;
    closeMenu();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (isOpenState) {
      close();
      return;
    }
    closeMenu();
  });

  sync();

  return {
    open,
    close,
    closeMenu,
    isOpen: () => isOpenState,
    isMenuOpen: () => isMenuOpenState,
  };
}
