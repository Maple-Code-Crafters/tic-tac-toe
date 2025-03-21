/// <reference types="cypress" />

describe('Play page', () => {
  describe('When visiting the root page then should have the New Game as header', () => {
    it('Visits the app root url', () => {
      cy.visit('/');
      cy.contains('ion-title', 'New Game');
      cy.get('ion-card').should('have.length', 1);
      cy.get('ion-button').should('have.length', 1);
      cy.get('ion-input').should('have.length', 2);
    });
  });

  describe('Player name alert tests', () => {
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
      cy.wait(1000);
      //  clear player 2 name
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
      cy.wait(1000);
      // click on two players button
      cy.get('ion-segment-button').each(($el, index) => {
        if (index === 1) {
          cy.wrap($el).click();
        }
      });
      cy.get('ion-button').click();
      cy.get('.alert-message').should('have.length', 0);
    });
  });
});
