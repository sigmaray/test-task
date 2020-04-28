Rails.application.routes.draw do
  root to: 'application#index'

  namespace :api do
    resources :accounts, only: [:index, :create]
    resources :transfers, only: [:index, :create]
  end

  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
