import * as yup from 'yup';

const validate = (url, feeds = []) => yup
  .string()
  .url('url')
  .required('Field is required')
  .validateSync(url)
export default validate;
