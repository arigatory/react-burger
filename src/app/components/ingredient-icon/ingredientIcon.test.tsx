import renderer from 'react-test-renderer';

import IngredientIcon from './IngredientIcon';

it('Рисует иконку ингредиента бургера', () => {
  const tree = renderer
    .create(
      <IngredientIcon img="https://code.s3.yandex.net/react/code/bun-02.png" />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
