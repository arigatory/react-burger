import * as yup from 'yup';

export const validationSchema = yup.object({
  token: yup.string().required('Введите код из Email'),
  password: yup.string().required('Введите пароль'),
});
