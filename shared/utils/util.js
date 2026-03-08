function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function occasionally(callback) {
  if (Math.random() < 0.5) {
    return callback();
  } else {
    throw new Error('fuck it');
  }
}

export function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function get_random_increase(
  prev = 0,
  normalRange = [1, 10],
  spikeRange = [110, 150],
  spikeChance = 0.05
) {
  if (Math.random() < spikeChance) {
    const [minS, maxS] = spikeRange;
    const spike = Math.random() * (maxS - minS) + minS;
    return prev + spike;
  }

  const [minN, maxN] = normalRange;
  const normalIncrease = Math.floor(Math.random() * (maxN - minN + 1)) + minN;

  return prev + normalIncrease;
}

export function add_codes(list, code_area_id) {
  const container = document.getElementById(code_area_id);
  if (!container) return;

  let body = container.querySelector('.codes_body');
  if (!body) {
    body = document.createElement('div');
    body.className = 'codes_body';
    container.appendChild(body);
  }

  body.innerHTML = '';

  list.forEach(({ title, source }) => {
    const safeTitle = escapeHtml(title);
    const safeSource = escapeHtml(source);
    body.insertAdjacentHTML(
      'beforeend',
      `<h5>${safeTitle}</h5><pre><code class="language-js">${safeSource}</code></pre>`
    );
  });
}

function normalizeThoughtLanguage(languageTag) {
  const tag = (languageTag || '').toLowerCase();
  if (tag.startsWith('ko')) return 'ko';
  if (tag.startsWith('zh')) return 'zh';
  if (tag.startsWith('ja')) return 'ja';
  if (tag.startsWith('en')) return 'en';
  return 'en';
}

function splitThoughtReadme(source) {
  if (typeof source !== 'string') {
    return { localized: null, original: '', translation: '' };
  }

  const sections = source
    .split(/\r?\n---\r?\n/)
    .map((section) => section.trim())
    .filter(Boolean);

  const localized = {};
  for (const section of sections) {
    const lines = section.split(/\r?\n/);
    const marker = lines[0]?.trim().match(/^<!--\s*lang:(ko|en|zh|ja)\s*-->$/);
    if (!marker) continue;
    localized[marker[1]] = lines.slice(1).join('\n').trim();
  }

  if (Object.keys(localized).length > 0) {
    return { localized, original: '', translation: '' };
  }

  const delimiterIndex = source.split(/\r?\n/).findIndex((line) => line.trim() === '---');
  if (delimiterIndex === -1) {
    return { localized: null, original: source.trim(), translation: '' };
  }

  const lines = source.split(/\r?\n/);
  const original = lines.slice(0, delimiterIndex).join('\n').trim();
  const translation = lines.slice(delimiterIndex + 1).join('\n').trim();
  return { localized: null, original, translation };
}

function selectThoughtReadmeByLanguage(source, languageTag) {
  const { localized, original, translation } = splitThoughtReadme(source);
  const language = normalizeThoughtLanguage(languageTag);

  if (localized) {
    return localized[language] || localized.en || localized.ko || localized.zh || localized.ja || source;
  }

  if (!translation) return original || source;
  if (language === 'ko') return original || source;
  return translation || original || source;
}

export function render_readme(target, source, language = 'markdown') {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return;

  const activeLanguage =
    typeof document !== 'undefined' ? document.documentElement.getAttribute('lang') : null;
  const resolvedSource = selectThoughtReadmeByLanguage(source, activeLanguage);

  element.classList.add('readme-block');
  element.innerHTML = '';

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.className = `language-${language}`;
  code.textContent = resolvedSource;
  pre.appendChild(code);
  element.appendChild(pre);
}