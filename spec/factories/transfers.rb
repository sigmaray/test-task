FactoryBot.define do
  factory :transfer do
    account_from { create(:account) }
    account_to { create(:account) }
    amount { Money.new(1) }
  end
end
