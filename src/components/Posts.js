import _ from 'lodash';

export default class Posts{
    constructor(){
        this.posts = [];
        this.current = [];
    }
    addPost(object){
        const id = _.uniqueId();
        const li = document.createElement('li');
        const a = document.createElement('a');
        const button = document.createElement('button');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
        a.href = object.link;
        a.classList.add('fw-bold')
        a.setAttribute('data-id', id);
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = object.title;
        button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        button.type = 'button';
        button.textContent = 'Просмотр';
        button.id = id;
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');
        object.id = id;
        li.appendChild(a);
        li.appendChild(button);
        this.current.push(li);
    }
    getPosts(){
        return this.posts;
    }
    toHTML(){
        this.posts.unshift(this.current);
        this.current = [];
        const ul = document.createElement('ul');
        const container = document.createElement('div');
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        container.classList.add('card', 'border-0');
        div.classList.add('card-body');
        h2.classList.add('card-title', 'h4');
        ul.classList.add('list-group', 'border-0', 'rounded-0');
        h2.textContent = 'Посты'
        this.posts.flat().forEach((li) =>{
            ul.appendChild(li);
        })
        div.appendChild(h2);
        container.appendChild(div);
        container.appendChild(ul);
        return container;
    }
}