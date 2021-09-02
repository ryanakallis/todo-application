class Api::V1::TasksController < ApplicationController
    before_action :set_task, only: [:show, :edit, :update, :destroy]
    
    def index
        @tasks = Task.all
    end
    def show
        respond_to do |format|
            format.json { render :show }
        end
    end
    def create
        @task = Task.new(task_params)
        respond_to do |format|
            if @task.save
                format.json { render :show, status: :created, location: api_v1_task_path(@task) }
            else
                format.json { render json: @task.errors, status: :unprocessable_entity }
            end
        end
    end
    def update
        respond_to do |format|
            if @task.update(task_params)
                format.json { render :show, status: :ok, location: api_v1_task_path(@task) }
            else
                format.json { render json: @task.errors, status: :unprocessable_entity }
            end
        end
    end
    def bulk_destroy
        Task.where(complete: true).delete_all
        respond_to do |format|
            format.json { head :no_content }
        end
    end
    def destroy
        @task.destroy
        respond_to do |format|
            format.json { head :no_content }
        end
    end
    private
        def set_task
            @task = Task.find(params[:id])
        end
        
        def task_params
            params.require(:task).permit(:title, :complete)
        end
end
