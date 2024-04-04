/// <reference types="cypress" />

describe('Play page - components', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('ion-header', 'New Game');
    cy.get('ion-card').should('have.length', 1);
    cy.get('ion-button').should('have.length', 1);
    cy.get('ion-input').should('have.length', 2);
  });
});
