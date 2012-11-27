VP_Revit_API::Application.routes.draw do
  devise_for :users

  resource :home, only: :index
  
  #root to: 'vp#index'
  root to: 'home#index'

  match '/frame' => 'vp#frame', as: :frame
  match '/index' => 'vp#index', as: :index

  resource :block_codes
end
