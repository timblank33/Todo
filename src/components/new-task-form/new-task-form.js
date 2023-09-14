import React, { Component } from 'react'
import './new-task-form.css'
export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }
  onLableChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onMinChange = (e) => {
    if (e.target.value < 60) {
      this.setState({
        min: e.target.value,
        sec: this.state.sec.length > 0 ? this.state.sec : '00',
      })
    } else {
      this.setState({
        min: '60',
      })
    }
  }
  onSecChange = (e) => {
    let format = e.target.value.split('')

    if (format.length > 2 && format[0] == 0) {
      format.splice(0, format.length - 2)
    }
    if (e.target.value < 60) {
      this.setState({
        sec: e.target.value,
        min: this.state.min.length > 0 ? this.state.min : '00',
      })
    } else {
      this.setState({
        sec: '60',
      })
    }
  }
  formatTime = (value) => {
    let arr = value.split('')
    let i = arr.slice(arr.length - 2, arr.length)
    return i.join('')
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onItemAdded(this.state.label, this.formatTime(this.state.min), this.formatTime(this.state.sec))
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            onChange={this.onLableChange}
            onKeyDown={this.onKeyDown}
            placeholder="What needs to be done?"
            value={this.state.label}
          ></input>
          <input
            type="number"
            onChange={this.onMinChange}
            onKeyDown={this.onKeyDown}
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
          />
          <input
            type="number"
            onChange={this.onSecChange}
            onKeyDown={this.onKeyDown}
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
          />
        </form>
      </header>
    )
  }
}
