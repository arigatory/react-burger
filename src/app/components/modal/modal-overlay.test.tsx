import { render, fireEvent, screen } from '@testing-library/react';

import ModalOverlay from './modal-overlay';

it('Вызывает переданную функцию при клике на оверлей', () => {
  const func = jest.fn();

  // Рендерим ссылку в переменную
  render(
    <ModalOverlay onClick={func} />
  );
  // Имитируем нажатие на оверлей
  const element = screen.getByTestId('test')
  fireEvent.click(element);

  // Проверяем, что переданная в оверлей функция сработала 1 раз
  expect(func).toBeCalledTimes(1);
});
