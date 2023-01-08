import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup.string().email('Не похоже на email').required('Email обязателен'),
  password: yup.string().required('Введите пароль'),
});
