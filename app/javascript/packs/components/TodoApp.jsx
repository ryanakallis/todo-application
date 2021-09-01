import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";

import ErrorMessage from "./ErrorMessage";
import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            hideCompletedTodoItems: false,
            errorMessage: null
        };
        this.getTodoItems = this.getTodoItems.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);
        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    componentDidMount() {
        this.getTodoItems();
    }

    handleErrors(errorMessage) {
        this.setState({ errorMessage });
    }

    clearErrors() {
        this.setState({errorMessage: null});
    }

    toggleCompletedTodoItems() {
        this.setState({ hideCompletedTodoItems: !this.state.hideCompletedTodoItems });
    }

    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems];
        this.setState({ todoItems });
    }

    getTodoItems() {
        axios
            .get("/api/v1/tasks")
            .then(response => {
                this.clearErrors();
                const todoItems = response.data;
                this.setState({ todoItems });
            })
            .catch(error => {
                
                this.setState({
                    errorMessage: {
                        message: "There was an error loading your todo items..."
                    }
                });
            });
    }

    render() {
        return (
            <>
                {this.state.errorMessage && (
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                )}

                <TodoForm 
                    createTodoItem={this.createTodoItem}      
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                />

                <TodoItems
                    toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                    hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                >
                    {this.state.todoItems.map(todoItem => (
                        <TodoItem 
                            key={todoItem.id} 
                            todoItem={todoItem} 
                            getTodoItems={this.getTodoItems}
                            hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                            handleErrors={this.handleErrors}
                            clearErrors={this.clearErrors}
                        />
                    ))}
                </TodoItems>
            </>
        );
    }
}

document.addEventListener('turbolinks:load', () => {
  const app = document.getElementById('todo-app')
  app && ReactDOM.render(<TodoApp />, app)
})