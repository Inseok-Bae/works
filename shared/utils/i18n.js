import catalog from '../i18n/translations.json';

const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh', 'ja'];
const FALLBACK_LANGUAGE = 'en';
const STORAGE_KEY = 'works:preferred-language';
const SWITCHER_ID = 'languageSwitcher';

function asSupportedLanguage(value) {
  if (!value || typeof value !== 'string') return null;
  const lower = value.toLowerCase();
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('ko')) return 'ko';
  if (lower.startsWith('en')) return 'en';
  return null;
}

function getStoredLanguage() {
  if (typeof localStorage === 'undefined') return null;
  try {
    return asSupportedLanguage(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function clearStoredLanguage() {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function setStoredLanguage(language) {
  if (!language) {
    clearStoredLanguage();
    return;
  }
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Ignore storage failures.
  }
}

function getByPath(source, path) {
  if (!source) return undefined;
  return path.split('.').reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
    return undefined;
  }, source);
}

function interpolate(template, params = {}) {
  if (!params || typeof params !== 'object') return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return String(params[key]);
    }
    return `{${key}}`;
  });
}

function detectBrowserLanguage(preferredLanguages = null) {
  const source =
    preferredLanguages ??
    (typeof navigator !== 'undefined'
      ? navigator.languages || [navigator.language]
      : [FALLBACK_LANGUAGE]);

  const candidates = Array.isArray(source) ? source : [source];
  for (const locale of candidates) {
    const supported = asSupportedLanguage(locale);
    if (supported) return supported;
  }
  return FALLBACK_LANGUAGE;
}

function createLanguageSwitcher({ language, selectedLanguage, t, onSelect, utilityActions = [] }) {
  if (typeof document === 'undefined') return;

  document.getElementById(SWITCHER_ID)?.remove();

  const root = document.createElement('div');
  root.id = SWITCHER_ID;
  root.className = 'language-switcher';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'language-switcher-toggle';
  const utilityAria = `${t('common.thought.menuAria')} ¡¤ ${t('common.language.menuAria')}`;
  toggle.setAttribute('aria-label', utilityAria);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('title', utilityAria);
  toggle.innerHTML = `
    <span class="language-switcher-icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <span class="language-switcher-label" aria-hidden="true">MENU</span>
    <span class="language-switcher-code">${language.toUpperCase()}</span>
  `;

  const menu = document.createElement('div');
  menu.className = 'language-switcher-menu';
  menu.hidden = true;
  menu.setAttribute('aria-label', utilityAria);

  const options = ['auto', ...SUPPORTED_LANGUAGES];
  for (const optionLanguage of options) {
    const isAuto = optionLanguage === 'auto';
    const isActive = isAuto ? selectedLanguage == null : optionLanguage === selectedLanguage;

    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'language-switcher-option';
    item.dataset.language = optionLanguage;
    item.dataset.active = String(isActive);
    item.setAttribute('aria-pressed', String(isActive));
    item.textContent = t(`common.language.options.${optionLanguage}`);
    item.addEventListener('click', () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      onSelect(optionLanguage);
    });
    menu.appendChild(item);
  }

  const visibleActions = Array.isArray(utilityActions)
    ? utilityActions.filter((action) => {
        if (!action || typeof action !== 'object') return false;
        if (typeof action.isVisible === 'function') return Boolean(action.isVisible());
        return true;
      })
    : [];

  if (visibleActions.length > 0) {
    const separator = document.createElement('div');
    separator.className = 'language-switcher-separator';
    separator.setAttribute('aria-hidden', 'true');
    menu.appendChild(separator);

    for (const action of visibleActions) {
      const item = action.href ? document.createElement('a') : document.createElement('button');
      if (!action.href) {
        item.type = 'button';
      } else {
        item.href = action.href;
      }

      const label =
        typeof action.label === 'string'
          ? action.label
          : action.labelKey
            ? t(action.labelKey)
            : '';
      if (!label) continue;

      item.className = 'language-switcher-option language-switcher-action';
      item.textContent = label;
      if (action.ariaLabelKey) {
        item.setAttribute('aria-label', t(action.ariaLabelKey));
      }

      item.addEventListener('click', (event) => {
        menu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        if (typeof action.onSelect === 'function') {
          action.onSelect(event);
        }
      });

      menu.appendChild(item);
    }
  }

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    toggle.setAttribute('aria-expanded', String(willOpen));
  };

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('pointerdown', (event) => {
    if (menu.hidden) return;
    const target = event.target;
    if (root.contains(target)) return;
    closeMenu();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
  });

  root.appendChild(toggle);
  root.appendChild(menu);
  document.body.appendChild(root);
}

export function detectLanguage(preferredLanguages = null) {
  return getStoredLanguage() ?? detectBrowserLanguage(preferredLanguages);
}

export function createTranslator(language) {
  const resolved = SUPPORTED_LANGUAGES.includes(language) ? language : FALLBACK_LANGUAGE;
  const fallbackDictionary = catalog[FALLBACK_LANGUAGE] || {};
  const dictionary = catalog[resolved] || fallbackDictionary;

  return (key, params) => {
    const raw = getByPath(dictionary, key) ?? getByPath(fallbackDictionary, key) ?? key;
    if (typeof raw !== 'string') return String(raw);
    return interpolate(raw, params);
  };
}

export function applyI18nToDocument(t, root = document) {
  if (!root || typeof root.querySelectorAll !== 'function') return;

  root.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    const translated = t(key);
    if (translated === key) return;
    element.textContent = translated;
  });

  const attributeBindings = [
    ['data-i18n-aria-label', 'aria-label'],
    ['data-i18n-title', 'title'],
  ];

  attributeBindings.forEach(([dataAttr, targetAttr]) => {
    root.querySelectorAll(`[${dataAttr}]`).forEach((element) => {
      const key = element.getAttribute(dataAttr);
      if (!key) return;
      const translated = t(key);
      if (translated === key) return;
      element.setAttribute(targetAttr, translated);
    });
  });
}

export function initI18n({ language = null, withSwitcher = true, utilityActions = [] } = {}) {
  const selectedLanguage = asSupportedLanguage(language) || getStoredLanguage();
  const resolvedLanguage = selectedLanguage || detectBrowserLanguage();
  const t = createTranslator(resolvedLanguage);

  const setLanguage = (nextLanguage, { reload = true } = {}) => {
    const resolvedNextLanguage = asSupportedLanguage(nextLanguage);
    if (resolvedNextLanguage) {
      setStoredLanguage(resolvedNextLanguage);
    } else {
      clearStoredLanguage();
    }
    const activeLanguage = resolvedNextLanguage || detectBrowserLanguage();
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', activeLanguage);
    }
    if (reload && typeof window !== 'undefined') {
      window.location.reload();
    }
    return activeLanguage;
  };

  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', resolvedLanguage);
    applyI18nToDocument(t, document);
    if (withSwitcher) {
      createLanguageSwitcher({
        language: resolvedLanguage,
        selectedLanguage,
        utilityActions,
        t,
        onSelect: (selectedOption) => {
          if (selectedOption === 'auto' && selectedLanguage == null) return;
          if (selectedOption === selectedLanguage) return;
          setLanguage(selectedOption, { reload: true });
        },
      });
    }
  }

  return {
    language: resolvedLanguage,
    selectedLanguage,
    t,
    setLanguage,
  };
}

export { SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE, STORAGE_KEY };
