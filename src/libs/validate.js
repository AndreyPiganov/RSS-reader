import * as yup from 'yup';

const validate = (url) => yup
  .string()
  .url('Validation Error')
  .required('Field is required')
  .validate(url)
  .then(() => null)
  .catch((err) => ({ isError: true, errorType: err.message }));
export default validate;
