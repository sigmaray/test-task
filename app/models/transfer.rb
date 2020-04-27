class Transfer < ApplicationRecord
  belongs_to :account_from, class_name: 'Account'
  belongs_to :account_to, class_name: 'Account'

  monetize :amount_cents, allow_nil: false

  validates :account_from, :account_to, :amount, presence: true
  validates :amount_cents, numericality: { greater_than: 0 }

  validate do
    if account_from.present? && account_to.present?
      if account_from.id == account_to.id
        message = "source and destination accounts can't be same"
        errors.add(:account_from, message)
        errors.add(:account_to, message)
      elsif amount > account_from.balance
        errors.add(:amount, 'balance is not sufficient')
      end
    end
  end

  before_save do
    ActiveRecord::Base.transaction do
      account_from.balance -= amount
      account_to.balance += amount
      account_from.save!
      account_to.save!
    rescue StandardError
      errors.add(:base, 'Could not transfer money. Please check input data and try one more time')
      throw(:abort)
    end
  end
end
