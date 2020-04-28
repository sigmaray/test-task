class API::AccountsController < API::APIController
  def index
    render json: {
      accounts: Account.all
    }
  end

  def create
    @account = Account.new(account_params)
    if @account.save
      render json: { status: :success }.to_json
    else
      render json: { status: :error, errors: @account.errors }, status: 500
    end
  end

  private

  def account_params
    params.require(:account).permit(:person_name, :balance)
  end
end
