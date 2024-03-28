/// <reference types="cypress" />

describe('Player Name Alert Tests', () => {
  it('When player1 name is not set then the alert shows the player1 message', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[aria-label="reset"]').each(($el) => {
      cy.wrap($el).click();
    });
    cy.get('ion-button').click();
    cy.get('.alert-message').eq(0).contains('Please, enter player 1 name.');
  });

  it('When player1 name is set but player2 name is not set then the alert shows the player2 message', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[aria-label="reset"]').each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).click();
      }
    });
    cy.get('ion-button').click();
    cy.get('.alert-message').eq(0).contains('Please, enter player 2 name.');
  });

  it('When player names are set then there is no alert', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('ion-input').eq(0).type('Player 1');
    cy.get('ion-input').eq(1).type('Player 2');
    cy.get('ion-button').click();
    cy.get('.alert-message').should('have.length', 0);
  });
});
