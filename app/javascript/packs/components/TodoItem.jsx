import React from 'react'
import PropTypes from 'prop-types'
import _ from "lodash";

import { Droppable, Draggable } from 'react-beautiful-dnd';

import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

import cross from '../../../assets/images/icon-cross.svg'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            complete: this.props.todoItem.complete,
        }
        this.handleDestroy = this.handleDestroy.bind(this);
        this.path = `/api/v1/tasks/${this.props.todoItem.id}`;

        this.handleChange = this.handleChange.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
        this.inputRef = React.createRef();
        this.completedRef = React.createRef();
    }

    handleChange() {
        this.setState({
            complete: this.completedRef.current.checked
        });
        this.updateTodoItem();
    }

    updateTodoItem = _.debounce(() => {
        setAxiosHeaders();
        axios
            .put(this.path, {
                task: {
                    title: this.inputRef.current.value,
                    complete: this.completedRef.current.checked
                }
            })
            .then(() => {
                this.props.clearErrors();
            })
            .catch(error => {
                this.props.handleErrors(error);
            });
    }, 1000);

    handleDestroy() {
        setAxiosHeaders();
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
            axios
                .delete(this.path)
                .then(response => {
                    this.props.getTodoItems();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    render() {
        const { todoItem } = this.props
        return (
            <Draggable key={todoItem.id} draggableId={todoItem.id.toString()} index={todoItem.id}>
                {(provider) => (
                    <tr {...provider.dragHandleProps} {...provider.draggableProps} ref={provider.innerRef    }
                        className={`${ this.state.complete && this.props.hideCompletedTodoItems ? `d-none` : "" }`}
                    >
                    <td style={{width: "10px"}}>
                        <div>
                            <input
                                id="trigger"
                                defaultChecked={this.state.complete}
                                type="checkbox"
                                onChange={this.handleChange}
                                ref={this.completedRef}
                                className="form-check-input checker"
                                id={`complete-${todoItem.id}`}
                            />
                        </div>
                    </td>   
                    <td>
                        <input
                            type="text"
                            defaultValue={todoItem.title}
                            readOnly={this.state.complete}
                            onChange={this.handleChange}
                            ref={this.inputRef}
                            className={`form-control no-border ${this.state.complete ? "completed_task" : "active_task"}`}
                            id={`todoItem__title-${todoItem.id}`}
                        />
                    </td>
                    <td className="text-right align-middle">
                        <button 
                            className="btn btn-link text-decoration-none font-weight-light fs-1 float-end"
                            aria-label="Delete"
                            onClick={this.handleDestroy}
                        >
                            <img src={cross} />
                        </button>
                    </td>
                    </tr>
                )}
            </Draggable>
        )
    }
}

export default TodoItem

TodoItem.propTypes = {
  todoItem: PropTypes.object.isRequired,
  getTodoItems: PropTypes.func.isRequired,
  hideCompletedTodoItems: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired
}