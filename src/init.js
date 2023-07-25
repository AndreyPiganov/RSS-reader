import initWatcher from "./view.js";

import i18next from "i18next";

import resources from './locales/index.js';

const init = async () =>{
    const state = 
    {
        lang: 'ru',
    }
    const watcherState = initWatcher(state);

    const i18nextInstance = i18next.createInstance()
    await i18nextInstance.init({
        lng: state.lang,
        resources,
    })
}