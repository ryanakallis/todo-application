Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#my_tasks'
  get 'pages/my_tasks'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :tasks do
        collection do 
          delete :bulk_destroy
        end
      end
    end
  end
end
