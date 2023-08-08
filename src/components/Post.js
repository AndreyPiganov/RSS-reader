import _ from 'lodash';

export default class Post{
    constructor(element){
        this.title = element.querySelector('title').textContent;
        this.description = element.querySelector('description').textContent;
        this.link = element.querySelector('link').textContent;
        this.id = _.uniqueId();
    }
    get(name){
        return this[name];
    }
    renderAsHTML(){
        const id = this.id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        const button = document.createElement('button');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
        a.href = this.link;
        a.classList.add('fw-bold');
        a.setAttribute('data-id', id);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = this.title;
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.type = 'button';
        button.textContent = 'Просмотр';
        button.setAttribute('data-id', id);
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        li.appendChild(a);
        li.appendChild(button);
        return li;
    }
}