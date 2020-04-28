ActiveAdmin.register Account do
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

  permit_params :person_name, :balance

  controller do
    actions :all, except: [:edit]
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    f.inputs 'Details' do
      f.input :person_name
      f.input :balance
    end
    f.actions
  end
end
