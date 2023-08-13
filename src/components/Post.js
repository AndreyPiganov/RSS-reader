import _ from 'lodash';

import createElement from '../libs/createElement.js';

export default class Post {
  constructor(element) {
    this.title = element.querySelector('title').textContent;
    this.description = element.querySelector('description').textContent;
    this.link = element.querySelector('link').textContent;
    this.id = _.uniqueId();
  }

  get(name) {
    return this[name];
  }

  renderAsHTML() {
    const { id } = this;
    const li = createElement('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0']);
    const a = createElement('a', ['fw-bold'], {
      href: this.link, 'data-id': id, target: '_blank', rel: 'noopener noreferrer',
    }, this.title);
    const button = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm'], {
      type: 'button', 'data-id': id, 'data-bs-toggle': 'modal', 'data-bs-target': '#modal',
    }, 'Просмотр');
    li.appendChild(a);
    li.appendChild(button);
    return li;
  }
}
