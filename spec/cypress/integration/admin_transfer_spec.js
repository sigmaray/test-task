describe('Admin Transfer Spec', () => {
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
      cy.visit('/admin/transfers/new');
    });
  });

  it('Should transfer money', () => {
    cy.get('input#transfer_amount').clear().type('0.01');
    cy.get('select#transfer_account_from_id').select('Miss Lula Carter');
    cy.get('select#transfer_account_to_id').select('Elly Kuhic');
    cy.contains('Create Transfer').click();
    cy.contains('Transfer was successfully created.');
  });

  it('Should not transfer if balance is not sufficient', () => {
    cy.get('input#transfer_amount').clear().type('5000');
    cy.get('input#transfer_amount');
    cy.get('select#transfer_account_from_id').select('Miss Lula Carter');
    cy.get('select#transfer_account_to_id').select('Elly Kuhic');
    cy.contains('Create Transfer').click();
    cy.contains('balance is not sufficient');
  });

  it('Should not transfer zero', () => {
    cy.get('input#transfer_amount').clear();
    cy.get('select#transfer_account_from_id').select('Miss Lula Carter');
    cy.get('select#transfer_account_to_id').select('Elly Kuhic');
    cy.contains('Create Transfer').click();
    cy.contains('must be greater than 0');
  });

  it('Should not transfer when form is not filled', () => {
    cy.contains('Create Transfer').click();
    cy.contains("must exist and can't be blank");
  });
});
