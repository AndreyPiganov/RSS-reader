import onChange from 'on-change';

const formHandler = (value, elements, i18nInst, initState) => {
  elements.feedback.classList.remove('text-danger', 'text-success', 'text-warning');
  elements.input.classList.remove('is-invalid');
  elements.input.removeAttribute('readonly');
  elements.submit.removeAttribute('disabled');
  switch (value) {
    case 'adding':
      elements.input.setAttribute('readonly', 'true');
      elements.feedback.textContent = i18nInst.t('form.status.processing');
      elements.feedback.classList.add('text-warning');
      elements.submit.setAttribute('disabled', '');
      break;
    case 'success':
      elements.form.reset();
      elements.input.focus();
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = i18nInst.t('form.status.success');
      break;
    case 'failed':
      elements.input.classList.add('is-invalid');
      elements.feedback.textContent = i18nInst.t(`form.error.${initState.form.error}`);
      elements.feedback.classList.add('text-danger');
      break;
    default:
      break;
  }
};

const initWatcher = (initState, elements, i18nInst) => {
  const state = onChange(initState, (path, current, previous) => {
    switch (path) {
      case 'form.state':
        formHandler(current, elements, i18nInst, initState);
        break;
      case 'form.error':
        if (current !== previous) {
          elements.feedback.textContent = i18nInst.t(`form.error.${current}`);
        }
        break;
      default:
        break;
    }
  });
  return state;
};
export default initWatcher;
