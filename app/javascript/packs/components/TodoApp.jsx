import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import ErrorMessage from "./ErrorMessage";
import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

import setAxiosHeaders from "./AxiosHeaders";
import lightThemeIcon from '../../../assets/images/icon-sun.svg';
import darkThemeIcon from '../../../assets/images/icon-moon.svg';
import '../../../assets/stylesheets/dark.css'
import '../../../assets/stylesheets/light.css'


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            hideCompletedTodoItems: false,
            errorMessage: null,
            theme: "light"
        };
        this.getTodoItems = this.getTodoItems.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);
        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);
        this.handleDestroyCompleted = this.handleDestroyCompleted.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);
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

    handleDestroyCompleted() {
        setAxiosHeaders();
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
            axios
            .delete("/api/v1/tasks/bulk_destroy")
                .then(response => {
                    console.log(this.getTodoItems());
                    return;
                    this.getTodoItems();
                })
                .catch(error => {
                    console.log(error);
                });
        }
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

    toggleClass() {
        const selectedtheme = this.state.theme != "light" ? "light" : "dark"
        this.setState({ theme: selectedtheme });
    };

    render() {
        return (
            <>
                {this.state.errorMessage && (
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                )}
                <div className="d-flex justify-content-between">
                    <h2 style={{fontWeight: 900, color: "#fff"}}>T O D O</h2>
                    <span><img className="cursor-pointer" onClick={() => this.toggleClass()} src={this.state.theme != "light" ? lightThemeIcon : darkThemeIcon} /></span>
                </div>
                
                <TodoForm 
                    createTodoItem={this.createTodoItem}      
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                />

                <TodoItems
                    toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                    hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                    handleDestroyCompleted={this.handleDestroyCompleted}
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