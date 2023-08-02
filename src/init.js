import 'bootstrap/dist/css/bootstrap.min.css';

import initWatcher from "./view.js";

import i18next from "i18next";

import resources from './locales/index.js';

import validate from './libs/validate.js';

import parser from './parser.js';

import axios from 'axios';

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
        feeds: [],
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

    const getRss = (link) =>{
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`, {timeout: defaultTimeout})
        .then(response => {
            const data = response.data
            if (data.status.content_type.includes('rss') || data.status.content_type.includes('xml')) return data
          })
          .then(data => console.log(data.contents));
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
        /*.then(() => {
            watcherState.form.error = '';
            watcherState.form.state = 'adding';
        })
        .catch((err) => {
            watcherState.form.error = err.message;
            watcherState.form.state = 'failed';
        })
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`)
        .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
          })
          .catch((err) => console.log(err.m))
          */
    })
} 
export default init;