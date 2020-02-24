Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  root 'messages#index'
  resources :groups, only: [:index, :new, :create, :edit, :update]
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create]
  resources :groups, only: [:new, :create, :edit, :update]
end
