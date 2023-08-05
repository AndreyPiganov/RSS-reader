import * as yup from 'yup';

const validate = (url, validLinks) => yup
  .string()
  .url('url')
  .required('Field is required')
  .test('unique', 'unique', (value) => !validLinks.includes(value))
  .validateSync(url);
export default validate;
