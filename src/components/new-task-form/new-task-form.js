import React, { Component } from 'react'
import './new-task-form.css'
export default class NewTaskForm extends Component {
  state = {
    label: '',
  }
  onLableChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onItemAdded(this.state.label)
      this.setState({
        label: '',
      })
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          onChange={this.onLableChange}
          onKeyDown={this.onKeyDown}
          placeholder="What needs to be done?"
          value={this.state.label}
        ></input>
      </header>
    )
  }
}
