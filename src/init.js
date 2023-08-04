import 'bootstrap/dist/css/bootstrap.min.css';

import initWatcher from "./view.js";

import i18next from "i18next";

import resources from './locales/index.js';

import validate from './libs/validate.js';

import parser from './parser.js';

import axios from 'axios';

import Feeds from './components/Feeds.js';

const init = async () =>{
    const defaultTimeout = 10000;
    const updateInterval = 10000;
    const defaultLanguage = 'ru'

    const state = 
    {
        lang: defaultLanguage,
        form:{
            state: 'filling', error: '',
        },
        posts: [],
        feeds: new Feeds(),
    }

    const i18nextInstance = i18next.createInstance()
    await i18nextInstance.init({
        lng: state.lang,
        resources,
    })
    
    const elements = 
    {
        form: document.querySelector('form'),
        input: document.querySelector('input'),
        feedback: document.querySelector('.feedback'),
        posts: document.querySelector('.posts'),
        feeds: document.querySelector('.feeds'),
        submit: document.querySelector('button[type=submit]')
    }

    const watcherState = initWatcher(state, elements ,i18nextInstance);

   /* const render = (elements,name) =>{
        const container = document.createElement('div');
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const ul = document.createElement('ul');
        container.classList.add('card', 'border-0');
        div.classList.add('card-body');
        h2.classList.add('card-title', 'h4');
        ul.classList.add('list-group', 'border-0', 'rounded-0');
        h2.textContent = i18nextInstance.t(`reader.${name}`);
        div.appendChild(h2);
        container.appendChild(div);
        container.appendChild(ul);
        elements[name].appendChild(container)
   }*/

    const getRss = (link) =>{
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`, {timeout: defaultTimeout})
        .then((response) => {
            const data = response.data
            if (data.status.content_type.includes('xml')){
                return parser(data);
            }else{
            throw new Error('parse')
        }
          })
          .then((content) =>{
            const feeds = state.feeds;
            feeds.addFeed(content.feeds);
            elements.feeds.appendChild(feeds.toHTML());
          })
          .catch((error) => {
            const codeError = error.message.split(' ')[0];
            watcherState.form.error = codeError;
            watcherState.form.state = 'failed';
          })
    }
    elements.form.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData);
        const link = object.url;
        try{
        validate(link, state.feeds)
        watcherState.form.error = '';
        watcherState.form.state = 'adding';
        getRss(link)
    }
    catch(error){
        watcherState.form.error = error.message;
        watcherState.form.state = 'failed';
    }
    })
} 
export default init;