import onChange from 'on-change';

const initWatcher = (initState, elements, i18nInst) => {
  const formHandler = (value) =>{
    elements.feedback.classList.remove('text-danger', 'text-success', 'text-warning');
    elements.input.classList.remove('is-invalid');
    switch(value){
      case 'filling':
        
        break;
      case 'adding':
        elements.input.setAttribute('readonly', 'true');
        elements.feedback.textContent = i18nInst.t('form.status.processing')
        elements.feedback.classList.add('text-warning');
        elements.submit.setAttribute('disabled', '');
        break;
      case 'failed':
        elements.input.classList.add('is-invalid');
        elements.feedback.textContent = i18nInst.t(`form.error.validation.${initState.form.error}`);
        elements.feedback.classList.remove('text-success');
        elements.feedback.classList.add('text-danger');
        break;
      case 'success':
        elements.feedback.classList.add('text-success');
        elements.feedback.textContent = i18nInst.t('form.status.success');
        break;
      default:
        break;
    }
  }
  const state = onChange(initState, (path, current, previous) => {
    switch(path){
      case 'form.state':
        formHandler(current);
        break;
        default:
          break;
    }
  });
  return state;
};
export default initWatcher;
