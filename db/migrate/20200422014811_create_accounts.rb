class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :person_name
      t.monetize :balance

      t.timestamps
    end
  end
end
