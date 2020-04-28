require 'rails_helper'

RSpec.describe Transfer, type: :model do
  let!(:account1) { FactoryBot.create(:account, balance: Money.new(100_00)) }
  let!(:account2) { FactoryBot.create(:account, balance: Money.new(100_00)) }

  it 'should create transfer' do
    record = FactoryBot.build(
      :transfer,
      account_from: account1,
      account_to: account2,
      amount: Money.new(1)
    )
    expect(record.save).to be true
    expect(account1.balance_cents).to eq(99_99)
    expect(account2.balance_cents).to eq(100_01)
  end

  it 'should not make negative balance' do
    record = FactoryBot.build(
      :transfer,
      account_from: account1,
      account_to: account2,
      amount: Money.new(500_00)
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include(amount: ['balance is not sufficient'])
  end

  it 'should not transfer to same account' do
    record = FactoryBot.build(
      :transfer,
      account_from: account1,
      account_to: account1,
      amount: Money.new(rand(1..10))
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include(account_from: ["source and destination accounts can't be same"],
                                              account_to: ["source and destination accounts can't be same"])
  end

  it 'should not transfer zero' do
    record = FactoryBot.build(
      :transfer,
      account_from: account1,
      account_to: account2,
      amount: Money.new(0)
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include(amount_cents: ['must be greater than 0'])
  end

  it 'should require account_from' do
    record = FactoryBot.build(
      :transfer,
      account_from: nil,
      account_to: account2,
      amount: Money.new(1)
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include(account_from: ['must exist', "can't be blank"])
  end

  it 'should requre account_to' do
    record = FactoryBot.build(
      :transfer,
      account_from: account1,
      account_to: nil,
      amount: Money.new(1)
    )
    expect(record.save).to be false
    expect(record.errors.messages).to include(account_to: ['must exist', "can't be blank"])
  end
end
