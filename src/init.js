import 'bootstrap/dist/css/bootstrap.min.css';

import initWatcher from "./view.js";

import i18next from "i18next";

import resources from './locales/index.js';

import validate from './libs/validate.js';

import parser from './parser.js';

import axios from 'axios';

import Feeds from './components/Feeds.js';

import Posts from './components/Posts.js';

import Modal from './components/Modal.js';

const init = async () =>{
    const defaultTimeout = 10000;
    const updateInterval = 10000;
    const defaultLanguage = 'ru'

    const state = 
    {
        lang: defaultLanguage,
        form:{
            state: 'filling', 
            error: '',
            urls: [],
        },
        posts: new Posts(),
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
        submit: document.querySelector('button[type=submit]'),
        modal: new Modal(document.getElementById('modal')),
    }

    const watcherState = initWatcher(state, elements ,i18nextInstance);

    const getRss = (link) =>{
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`, {timeout: defaultTimeout})
        .then((response) => {
            const data = response.data
            if (data.status.content_type.includes('xml')){
                watcherState.form.urls.push(link);
                return parser(data);
            }else{
            throw new Error('parse')
        }
          })
          .then((content) =>{
            const feeds = state.feeds;
            const posts = state.posts;
            feeds.addFeed(content.feeds);
            content.posts.forEach((post) =>{
                posts.addPost(post);
            })
            elements.feeds.innerHTML = '';
            elements.posts.innerHTML = '';
            elements.feeds.appendChild(feeds.toHTML());
            elements.posts.appendChild(posts.toHTML())
            watcherState.form.error = '';
            watcherState.form.state = 'success';
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
        validate(link, state.form.urls)
        watcherState.form.error = '';
        watcherState.form.state = 'adding';
        getRss(link)
    }
    catch(error){
        watcherState.form.error = error.message;
        watcherState.form.state = 'failed';
    }
    })
    elements.posts.addEventListener('click', async (event) =>{
        if(event.target.tagName !== 'BUTTON'){
            return;
        }
        const id = event.target.dataset.id;
        const a = document.querySelector(`a[data-id="${id}"]`)
        const modal = elements.modal;
        modal.open(a);
        modal.close();
    });
} 
export default init;