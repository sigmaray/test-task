require 'rails_helper'

RSpec.describe API::AccountsController do
  describe 'GET #index' do
    it 'should return accounts' do
      FactoryBot.create_list(:account, 10)
      get :index
      expect(response).to have_http_status(:success)
      parsed = JSON.parse(response.body)
      expect(parsed).to include('accounts')
      accounts = parsed['accounts']
      expect(accounts.length).to be(10)
      expect(accounts.first.keys).to include(
        'id', 'person_name', 'balance_cents', 'balance_currency', 'created_at', 'updated_at'
      )
    end
  end

  describe 'POST #create' do
    it 'should create account' do
      post :create, params: { account: { person_name: 'Foobar', balance: '100.00' } }
      expect(response).to have_http_status(:success)
    end

    it 'should not create for same person' do
      FactoryBot.create(:account, person_name: 'Foobar')
      post :create, params: { account: { person_name: 'Foobar', balance: '100.00' } }
      expect(response).to have_http_status(:error)
      expect(response.body).to include('has already been taken')
    end

    it 'should not allow empty values' do
      post :create, params: { account: { person_name: '', balance: '100.00' } }
      expect(response).to have_http_status(:error)
      expect(response.body).to include("can't be blank")
    end
  end
end
