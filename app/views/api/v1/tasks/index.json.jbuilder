# app/views/api/v1/tasks/index.json.jbuilder
json.array! @tasks, partial: "api/v1/tasks/task", as: :task