import createElement from '../libs/createElement.js';

export default class Feed {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  get(name) {
    return this[name];
  }

  set(name, content) {
    this[name] = content;
  }

  renderAsHTML() {
    const li = createElement('li', ['list-group-item', 'border-0', 'border-end-0']);
    const h3 = createElement('h3', ['h6', 'm-0'], {}, this.title);
    const p = createElement('p', ['m-0', 'small', 'text-black-50'], {}, this.description);
    li.appendChild(h3);
    li.appendChild(p);
    return li;
  }
}
