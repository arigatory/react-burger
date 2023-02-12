const email = 'arigatory@gmail.com';
const password = '!QAZxsw2';

describe('Creating order', () => {
  beforeEach(() => {});

  it('Visits the page and creates an order', () => {
    cy.visit('http://localhost:3000/constructor');
    cy.get('[data-testid="draggable-bun"]')
      .first()
      .trigger('dragstart')
      .trigger('dragleave');

    cy.get('[data-testid="droppable"]')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get('[data-testid="draggable-main"]')
      .first()
      .trigger('dragstart')
      .trigger('dragleave');

    cy.get('[data-testid="droppable"]')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.contains('Оформить заказ').click();

    cy.get('[data-testid=email_input]').type(`${email}{enter}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);

    cy.contains('Оформить заказ').click();

    cy.contains('Отправка заказа...').should('be.visible');
  });
});
