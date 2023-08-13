import 'bootstrap/dist/css/bootstrap.min.css';

import i18next from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import initWatcher from './view.js';

import resources from './locales/index.js';

import validate from './libs/validate.js';

import parser from './parser.js';

import Modal from './components/Modal.js';

import createElement from './libs/createElement.js';

const init = async () => {
  const defaultTimeout = 10000;
  const updateInterval = 5000;
  const defaultLanguage = 'ru';

  const state = {
    lang: defaultLanguage,
    form: {
      state: 'filling',
      error: '',
      urls: [],
    },
    posts: [],
    feeds: [],
  };

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: state.lang,
    resources,
  });

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('input'),
    feedback: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    submit: document.querySelector('button[type=submit]'),
    modal: new Modal(document.getElementById('modal')),
  };

  const watcherState = initWatcher(state, elements, i18nextInstance);
  const contentModal = elements.modal.getModal().querySelector('.modal-content');

  const listRender = (name) => {
    const ul = createElement('ul', ['list-group', 'border-0', 'rounded-0']);
    const container = createElement('div', ['card', 'border-0']);
    const div = createElement('div', ['card-body']);
    const h2 = createElement('h2', ['card-title', 'h4'], {}, i18nextInstance.t(`reader.${name}`));
    div.appendChild(h2);
    container.appendChild(div);
    container.appendChild(ul);
    return container;
  };

  const updatePosts = (links) => {
    const urls = links.map((link) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`, { timeout: defaultTimeout }));
    Promise.all(urls)
      .then((response) => {
        const ul = elements.posts.querySelector('ul');
        const posts = response.map((res) => {
          const content = parser(res.data);
          const contentPosts = content.posts;
          return contentPosts;
        });
        const titles = posts.flat().map((post) => post.title);
        const titlesState = state.posts.flat().map((post) => post.title);
        const diffTitles = _.difference(titles.flat(), titlesState);
        if (diffTitles.length === 0) {
          return;
        }
        const finderPosts = diffTitles.map((title) => {
          const findPost = posts.flat().find((post) => post.title === title);
          return findPost;
        });
        state.posts.unshift(...finderPosts);
        finderPosts.forEach((post) => ul.prepend(post.renderAsHTML()));
      })
      .catch((error) => error)
      .finally(() => setTimeout(() => updatePosts(state.form.urls), updateInterval));
  };

  const getRss = (link) => {
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`, { timeout: defaultTimeout })
      .then((response) => {
        const content = parser(response.data);
        state.form.urls.push(link);
        const { feeds } = state;
        const { posts } = state;
        feeds.unshift(content.feeds);
        posts.unshift(content.posts);
        if (elements.posts.childNodes.length === 0 && elements.feeds.childNodes.length === 0) {
          elements.posts.appendChild(listRender('posts'));
          elements.feeds.appendChild(listRender('feeds'));
        }
        const listPosts = elements.posts.querySelector('ul');
        const listFeeds = elements.feeds.querySelector('ul');
        listFeeds.prepend(content.feeds.renderAsHTML());
        content.posts.forEach((el) => {
          listPosts.prepend(el.renderAsHTML());
        });
        watcherState.form.error = '';
        watcherState.form.state = 'success';
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          elements.input.classList.add('is-invalid');
          elements.feedback.textContent = 'Ошибка сети';
          elements.feedback.classList.add('text-danger');
          return;
        }
        const codeError = error.message.split(' ')[0];
        watcherState.form.error = codeError;
        watcherState.form.state = 'failed';
      });
  };
  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);
    const link = object.url;
    try {
      validate(link, state.form.urls);
      watcherState.form.error = '';
      watcherState.form.state = 'adding';
      getRss(link);
    } catch (error) {
      watcherState.form.error = error.message;
      watcherState.form.state = 'failed';
    }
  });
  elements.posts.addEventListener('click', (event) => {
    updatePosts(state.form.urls);
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    const { id } = event.target.dataset;
    const object = state.posts.flat().find((content) => content.id === id);
    const a = document.querySelector(`a[data-id="${id}"]`);
    a.classList.remove('fw-bold');
    a.classList.add('fw-normal', 'link-secondary');
    elements.modal.open(object);
  });
  contentModal.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    document.body.classList.remove('modal-open');
    document.body.style = '';
    document.body.removeChild(document.body.lastChild);
    elements.modal.close();
  });
  setTimeout(() => {
    updatePosts(state.form.urls);
  }, updateInterval);
};
export default init;
