export default class Feeds {
  constructor() {
    this.feeds = [];
  }

  addFeed(object) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = object.title;
    p.textContent = object.description;
    li.appendChild(h3);
    li.appendChild(p);
    this.feeds.push(li);
  }

  getFeeds() {
    return this.feeds;
  }

  toHTML() {
    const ul = document.createElement('ul');
    const container = document.createElement('div');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    container.classList.add('card', 'border-0');
    div.classList.add('card-body');
    h2.classList.add('card-title', 'h4');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    h2.textContent = 'Фиды';
    this.feeds.forEach((li) => {
      ul.prepend(li);
    });
    div.appendChild(h2);
    container.appendChild(div);
    container.appendChild(ul);
    return container;
  }
}
