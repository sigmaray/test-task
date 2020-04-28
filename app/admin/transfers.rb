ActiveAdmin.register Transfer do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :person_name, :balance_cents, :balance_currency
  #
  # or
  #
  # permit_params do
  #   permitted = [:person_name, :balance_cents, :balance_currency]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  permit_params :account_from_id, :account_to_id, :amount

  controller do
    actions :all, except: [:edit]
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Details' do
      f.input :account_from
      f.input :account_to
      f.input :amount
    end
    f.actions
  end
end
