import 'bootstrap/dist/css/bootstrap.min.css';

import initWatcher from "./view.js";

import i18next from "i18next";

import resources from './locales/index.js';

import validate from './libs/validate.js';

import parser from './parser.js';

const init = async () =>{
    const defaultLanguage = 'ru'
    const state = 
    {
        lang: defaultLanguage,
        form:{
            state: 'valid', error: ''
        },
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

    elements.form.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const object = Object.fromEntries(formData);
        const link = object.url;
        validate(link)
        .then((val) => {
            watcherState.form.error = '';
            watcherState.form.state = 'adding';
        })
        .catch((err) => {
            watcherState.form.error = err.message;
            watcherState.form.state = 'failed';
        })
    })
} 
export default init;