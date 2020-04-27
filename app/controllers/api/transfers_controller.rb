class API::TransfersController < API::APIController
  def index
    render json: {
      transfers: Transfer.all
    }
  end

  def create
    @transfer = Transfer.new(target_params)
    if @transfer.save
      render json: { status: :success }.to_json
    else
      render json: { status: :error, errors: @transfer.errors }, status: 500
    end
  end

  private

  def target_params
    params.require(:transfer).permit(:account_from_id, :account_to_id, :amount)
  end
end
