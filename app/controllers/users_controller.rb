class UsersController < ApplicationController
  protect_from_forgery

  def create
    @user = User.create_with_set_token!

    render json: @user, status: :created
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:token)
    end
end
