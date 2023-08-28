class RoutineTasksController < ApplicationController
  protect_from_forgery
  before_action :get_token
  before_action :find_current_user

  # GET /routine_tasks or /routine_tasks.json
  def index
    @routine_tasks = RoutineTask.where(user_id: @current_user.id)

    render json: @routine_tasks, status: :ok
  end

  # POST /routine_tasks or /routine_tasks.json
  def create
    @routine_task = RoutineTask.new(routine_task_params)
    @routine_task.user = @current_user

    if @routine_task.save
      render json: @routine_task, status: :created
    else
      render json: @routine_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /routine_tasks/1 or /routine_tasks/1.json
  def update
    @routine_task = RoutineTask.find(params[:id])
    @routine_task.update!(routine_task_params)
    render json: @routine_task, status: :ok
  end

  # DELETE /routine_tasks/1 or /routine_tasks/1.json
  def destroy
    @routine_task = RoutineTask.find(params[:id])
    @routine_task.destroy
  end

  private

  # Only allow a list of trusted parameters through.
  def routine_task_params
    params.require(:routine_task).permit(:name)
  end

  def get_token
    authenticate_with_http_token do |token, options|
      @token = token
    end
  end

  def find_current_user
    @current_user = User.find_by(token: @token)
  end
end
