require 'rails_helper'

RSpec.describe Account, type: :model do
  it 'should create account' do
    record = FactoryBot.build(
      :account,
      person_name: 'qux'
    )
    expect(record.save).to be true
  end

  it 'should not allow empty values' do
    record = Account.new
    expect(record.save).to be false
    expect(record.errors.messages).to include({ person_name: ["can't be blank"] })
  end

  it 'should not create for same person' do
    FactoryBot.create(
      :account,
      person_name: 'foobar'
    )
    record = FactoryBot.build(
      :account,
      person_name: 'foobar'
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include({ person_name: ['has already been taken'] })
  end

  it 'should not create account with negative balance' do
    record = FactoryBot.build(
      :account,
      person_name: 'baz',
      balance: '-0.05'
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include({ balance_cents: ['must be greater than or equal to 0'] })
  end
end
