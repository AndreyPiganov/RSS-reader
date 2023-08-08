export default class Feed {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  get(name) {
    return this[name];
  }

  renderAsHTML() {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = this.title;
    p.textContent = this.description;
    li.appendChild(h3);
    li.appendChild(p);
    return li;
  }
}
