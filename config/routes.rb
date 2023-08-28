Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :routine_tasks, only: [:index, :create, :update, :destroy]
end
