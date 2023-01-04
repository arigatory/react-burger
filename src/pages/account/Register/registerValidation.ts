import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required("Введите имя"),
  email: yup.string().email('Не похоже на email').required('Email обязателен'),
  password: yup.string().required('Введите пароль'),
});
