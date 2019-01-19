class UsersController  < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
  end

  def submit_score
      @user = User.find_or_create_by(username: params[:username])
        byebug
      if @user
        @user.win_count = @user.win_count.to_i + 1
        @user.save
        end
      render json: {message: 'great success'}
  end

end
