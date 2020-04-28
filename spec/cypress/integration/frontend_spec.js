describe('Frontend Spec', () => {
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
      cy.visit('/');
    });
  });

  context('Accounts', () => {
    it('Should see accounts', () => {
      cy.contains('Miss Lula Carter');
      cy.contains('Elly Kuhic');
    });

    it('Should create account', () => {
      cy.get('input[name="account.person_name"]').type('Foobar');
      cy.get('input[name="account.balance"]').type('300.00');
      cy.contains('Create Account').click();
      cy.contains('Account was created');
    });

    it('Should not create account when form is not filled', () => {
      cy.contains('Create Account').click();
      cy.contains("can't be blank").click();
    });
  });

  context('Transfers', () => {
    it('Should transfer money', () => {
      cy.get('select[name="transfer.account_from_id"]').select(
        'Miss Lula Carter'
      );
      cy.get('select[name="transfer.account_to_id"]').select('Elly Kuhic');
      cy.get('input[name="transfer.amount"]').type('0.01');
      cy.contains('Create Transfer').click();
      cy.contains('Successfully transferred money');
      cy.contains('"amount_cents":1');
      cy.contains('"person_name":"Miss Lula Carter","balance_cents":9999');
      cy.contains('"person_name":"Elly Kuhic","balance_cents":20001');
    });

    it('Should not make negative balance', () => {
      cy.get('select[name="transfer.account_from_id"]').select(
        'Miss Lula Carter'
      );
      cy.get('select[name="transfer.account_to_id"]').select('Elly Kuhic');
      cy.get('input[name="transfer.amount"]').type('1000');
      cy.contains('Create Transfer').click();
      cy.contains('balance is not sufficient').click();
    });

    it('Should not transfer money when form is not filled', () => {
      cy.contains('Create Transfer').click();
      cy.contains('must exist').click();
    });

    it('Should not transfer zero', () => {
      cy.get('select[name="transfer.account_from_id"]').select(
        'Miss Lula Carter'
      );
      cy.get('select[name="transfer.account_to_id"]').select('Elly Kuhic');
      cy.get('input[name="transfer.amount"]').type('0.00');
      cy.contains('Create Transfer').click();
      cy.contains('must be greater than 0');
    });
  });
});
