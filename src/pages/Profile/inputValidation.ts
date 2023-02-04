import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Имя не должно быть пустым'),
  login: yup
    .string()
    .email('В качестве логина должен быть валидный email')
    .required('Логин (Email) обязателен'),
  password: yup.string().required('Пароль не должежн быть пустым'),
});
