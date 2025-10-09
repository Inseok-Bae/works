import hljs from "highlight.js";

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
  spikeChance = 0.01
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
    const highlighted = hljs.highlight(source, { language: 'javascript' }).value;
    body.insertAdjacentHTML(
      'beforeend',
      `<h5>${title}</h5><pre><code class="language-js">${highlighted}</code></pre>`
    );
  });
}

export function render_readme(target, source, language = 'markdown') {
  const element = typeof target === 'string' ? document.getElementById(target) : target;
  if (!element) return;

  let highlighted;
  try {
    highlighted = hljs.highlight(source, { language }).value;
  } catch {
    highlighted = hljs.highlightAuto(source).value;
  }

  element.classList.add('readme-block');
  element.innerHTML = `<pre><code class="language-${language}">${highlighted}</code></pre>`;
}
