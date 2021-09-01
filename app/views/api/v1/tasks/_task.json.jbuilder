# app/views/api/v1/tasks/_task.json.jbuilder
json.extract! task, :id, :title, :complete, :created_at, :updated_at