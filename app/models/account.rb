class Account < ApplicationRecord
  has_many :transfer_from, class_name: 'Transfer', dependent: :destroy, foreign_key: :account_from_id
  has_many :transfer_to, class_name: 'Transfer', dependent: :destroy, foreign_key: :account_to_id

  monetize :balance_cents, allow_nil: false

  validates :person_name, :balance, presence: true
  validates :person_name, uniqueness: true
  validates :balance_cents, numericality: { greater_than_or_equal_to: 0 }

  def to_s
    person_name
  end
end
