import * as yup from 'yup';

const validate = (url) => yup
  .string()
  .url('url')
  .required('Field is required')
  .validate(url)
export default validate;
