describe('Admin Account Spec', () => {
  beforeEach(() => {
    cy.app('clean'); // have a look at cypress/app_commands/clean.rb
    cy.appFactories([
      [
        'create',
        'account',
        { person_name: 'Miss Lula Carter', balance: '100.00' }
      ],
      ['create', 'account', { person_name: 'Elly Kuhic', balance: '200.00' }]
    ]).then(() => {
      cy.visit('/admin/accounts/new');
    });
  });

  it('Should create account', () => {
    cy.get('input#account_person_name').type('Ms. Dotty Littel');
    cy.get('input#account_balance').clear().type('100.00');
    cy.contains('Create Account').click();
    cy.contains('Account was successfully created.');
  });

  it('Should not create account for same person', () => {
    cy.get('input#account_person_name').type('Miss Lula Carter');
    cy.get('input#account_balance').clear().type('200.00');
    cy.contains('Create Account').click();
    cy.contains('has already been taken');
  });

  it('Should not create account with empty values', () => {
    cy.contains('Create Account').click();
    cy.contains("can't be blank");
  });
});
