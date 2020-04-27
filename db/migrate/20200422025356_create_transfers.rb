class CreateTransfers < ActiveRecord::Migration[6.0]
  def change
    create_table :transfers do |t|
      t.references :account_from, foreign_key: { to_table: 'accounts' }
      t.references :account_to, foreign_key: { to_table: 'accounts' }

      t.monetize :amount

      t.timestamps
    end
  end
end
