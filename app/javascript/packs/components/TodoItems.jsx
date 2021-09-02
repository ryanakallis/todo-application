import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class TodoItems extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleDestroyCompleted = this.handleDestroyCompleted.bind(this)
    }

    handleClick() {
        this.props.toggleCompletedTodoItems()
    }

    handleDestroyCompleted() {
        this.props.handleDestroyCompleted()
    }

    render() {
        let count = this.props.children.filter(function(value, index, arr){ return value.props.todoItem.complete !== true}).length
        return (
            <>
                <div className="">
                    <table className="table mw-100 overflow-hidden mb-0 border border-secondary bg-dark rounded">
                        <DragDropContext>
                            <Droppable droppableId="ToDoItems">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef} >
                                        {this.props.children}
                                        <tr>
                                            <td colSpan="3">
                                                <small>
                                                    <div className="d-flex flex-row justify-content-between">
                                                        <div className="p-2 text-muted">{count == 0 ? `` : count == 1 ? `${count} item left` : `${count} items left`}</div>
                                                        <div className="p-2 d-flex flex-row justify-content-between font-weight-bold">
                                                        <button
                                                            className="btn btn-link px-2 text-light font-weight-bold filter-text"
                                                            onClick={this.handleClick}
                                                        >
                                                        {this.props.hideCompletedTodoItems
                                                            ? `Show Completed Items`
                                                            : `Hide Completed Items `}
                                                        </button>
                                                        </div>
                                                        <div className="p-2 d-flex flex-row">
                                                            <button
                                                                className="btn btn-link text-light"
                                                                onClick={() => this.handleDestroyCompleted()}
                                                            >
                                                                <span className="link">Clear Completed</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </small>
                                            </td>
                                        </tr>
                                    {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </table>
                </div>
            </>
        )
    }
}
export default TodoItems

TodoItems.propTypes = {
  toggleCompletedTodoItems: PropTypes.func.isRequired,
  hideCompletedTodoItems: PropTypes.bool.isRequired,
  handleDestroyCompleted: PropTypes.func.isRequired,
}