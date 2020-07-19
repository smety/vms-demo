/* eslint-disable */
context('User', () => {
  it('Test login form (validator test)', () => {
    cy.visit('/')
    cy.get('[data-cy=form-email]').type('loradsakdnsadasd')
    cy.get('[data-cy=form-password]').type('032840432')
    cy.get('[data-cy=form]').submit()
    cy.get('.invalid-feedback').should('be.visible')
  })

  // todo pridat ajax volani a kontrolu tokenu
  it('Test login form (success login)', () => {
    cy.visit('/')
    cy.get('[data-cy=form-email]').type('loradsakdnsadasd')
    cy.get('[data-cy=form-password]').type('032840432')
  })
})
