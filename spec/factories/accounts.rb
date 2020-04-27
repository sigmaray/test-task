FactoryBot.define do
  factory :account do
    person_name do
      # Ensuring that possible_name is unique to avoid validation errors
      loop do
        possible_name = Faker::Name.name
        break possible_name unless Account.exists?(person_name: possible_name)
      end
    end

    balance { Money.new(rand(100_00..200_00)) }
  end
end
