import { format } from 'date-fns';

const conversations_presenter = document.getElementById('conversations_presenter');

export function appendMessage({ by, when }) {
  const side = by === 'murmurer' ? 'right' : 'left';

  Array.from(conversations_presenter.children)
    .slice(0, Math.max(0, conversations_presenter.children.length - 4))
    .filter((el) => !el.classList.contains('leaving'))
    .forEach((el) => {
      el.classList.add('leaving');
      el.addEventListener(
        'transitionend',
        () => {
          el.remove();
        },
        { once: true }
      );
    });

  conversations_presenter.insertAdjacentHTML(
    'beforeend',
    `
      <div class="msg ${side} enter">
        <div class="stack">
          <div class="meta meta--top">${by}</div>
          <div class="bubble"></div>
          <time class="meta meta--bottom" datetime="${when.toISOString()}">${format(when, 'HH:mm:ss')}</time>
        </div>
      </div>
      `
  );

  const newMsg = conversations_presenter.lastElementChild;

  newMsg.addEventListener('animationend', () => newMsg.classList.remove('enter'), { once: true });
}
