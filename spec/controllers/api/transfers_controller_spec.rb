require 'rails_helper'

RSpec.describe API::TransfersController do
  describe 'GET #index' do
    it 'should return transfers' do
      FactoryBot.create_list(:transfer, 10)
      get :index
      expect(response).to have_http_status(:success)
      parsed = JSON.parse(response.body)
      expect(parsed).to include('transfers')
      transfers = parsed['transfers']
      expect(transfers.length).to be(10)
      expect(transfers.first.keys).to include(
        'id', 'account_from_id', 'account_to_id', 'amount_cents',
        'amount_currency', 'created_at', 'updated_at'
      )
    end
  end

  describe 'POST #create' do
    let!(:acccount_from) { FactoryBot.create(:account, balance: Money.new(100_00)) }
    let!(:acccount_to) { FactoryBot.create(:account, balance: Money.new(200_00)) }

    it 'should transfer money' do
      post :create, params: {
        transfer: {
          account_from_id: acccount_from.id,
          account_to_id: acccount_to.id,
          amount: '0.01'
        }
      }
      expect(response).to have_http_status(:success)
      expect(acccount_from.reload.balance_cents).to be(99_99)
      expect(acccount_to.reload.balance_cents).to be(200_01)
    end

    it 'should not make negative balance' do
      post :create, params: {
        transfer: {
          account_from_id: acccount_from.id,
          account_to_id: acccount_to.id,
          amount: '500.00'
        }
      }
      expect(response).to have_http_status(:error)
      expect(response.body).to include('balance is not sufficient')
    end

    it 'should not allow empty values' do
      post :create, params: {
        transfer: {
          account_from_id: acccount_from.id,
          account_to_id: '',
          amount: '100.00'
        }
      }
      expect(response).to have_http_status(:error)
      expect(response.body).to include("can't be blank")
    end
  end
end
