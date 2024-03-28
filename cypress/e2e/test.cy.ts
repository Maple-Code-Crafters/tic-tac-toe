/// <reference types="cypress" />

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('ion-content', 'New Game');
    cy.get('ion-card').should('have.length', 1);
    cy.get('ion-button').should('have.length', 1);
    cy.get('ion-input').should('have.length', 2);
  });
});
