import React, { Component } from 'react'
import { array, func } from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
  }
  static propTypes = {
    onDeleted: func.isRequired,
    onToggleCompleted: func.isRequired,
    onToggleEditing: func.isRequired,
    saveItem: func.isRequired,
    todos: array,
  }
  render() {
    const { todos, play, onDeleted, onToggleCompleted, onToggleEditing, saveItem, updateItem } = this.props
    const elements = todos.map((item) => {
      const { id } = item
      return (
        <Task
          {...item}
          key={id}
          play={play}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onToggleEditing={() => onToggleEditing(id)}
          saveItem={saveItem}
          updateItem={updateItem}
        />
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}
