/**
 * Using CYPRESS-TESTING-LIBRARY
 *
 * CYPRESS ...................... https://docs.cypress.io/api
 * CYPRESS-TESTING-LIBRARY ...... https://github.com/testing-library/cypress-testing-library
 *
 * **/

import '@testing-library/cypress/add-commands'

context('GitHub', () => {
  it('should show the microsoft/Playwright project in the search if you search for Playwright', () => {
    cy.visit('https://github.com')
    cy.findByPlaceholderText( 'search',{ exact: false })
      .type('Playwright{enter}')
    cy.findByRole("link", { name: "microsoft/playwright" })
      .should('exist')
  })

  it('should contain \'Playwright\' in the project title', () => {
    cy.findByRole("link", { name: "microsoft/playwright" })
      .click()
    cy.get("#readme h1")
      .should('contain.text', 'Playwright')
  })
})