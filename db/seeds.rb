# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all

10.times do
  FactoryBot.create(
    :account,
    person_name: Faker::Name.name,
    balance: Money.new(rand(100_00..200_00))
  )
end

5.times do |i|
  Transfer.create!(
    account_from: Account.order('id ASC')[i],
    account_to: Account.order('id ASC')[Account.count - 1 - i],
    amount: Money.new(rand(1..10))
  )
end
