import React, { Component } from 'react'
import { func, string, number, instanceOf, bool } from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    label: '',
    play: true,
    active: false,
  }
  static defaultProps = {
    min: '00',
    sec: '00',
    completed: false,
    editing: false,
  }

  static propTypes = {
    id: number.isRequired,
    label: string.isRequired,
    min: string.isRequired,
    sec: string.isRequired,
    completed: bool,
    editing: bool,
    date: instanceOf(Date),
    onToggleEditing: func.isRequired,
    onDeleted: func.isRequired,
    onToggleCompleted: func.isRequired,
    saveItem: func.isRequired,
  }
  componentDidMount() {
    this.setState({ min: this.props.min, sec: this.props.sec })
  }
  componentDidUpdate(prevProps) {
    if (this.state.min == 0 && this.state.sec == 0 && !this.props.completed) {
      this.setState({ play: false })
      if (!this.props.completed) {
        this.props.onToggleCompleted()
      }
    }

    if (this.state.sec !== prevProps.sec) {
      this.props.updateItem(this.props.id, this.state.min, this.state.sec)
    }
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  timerS = (props) => {
    if (props <= 10 && props > 0) this.setState({ sec: `0${props - 1}` })
    else if (props > 0) this.setState({ sec: String(props - 1) })
  }
  timerM = (props) => {
    if (props <= 10 && props > 0) this.setState({ min: `0${props - 1}`, sec: 59 })
    else if (props > 0) this.setState({ min: String(props - 1), sec: '59' })
  }
  timer = () => {
    if (!this.state.active && this.state.play) {
      setInterval(() => {
        if (this.state.play && this.state.sec > 0) {
          this.timerS(this.state.sec)
        } else if (this.state.play && this.state.sec == 0 && this.state.min > 0) {
          this.timerM(this.state.min)
          this.setState({ sec: '59' })
        }
      }, 1000)
    }
  }
  render() {
    const { id, label, date, onDeleted, onToggleCompleted, onToggleEditing, completed, editing, saveItem } = this.props
    const { min, sec } = this.state
    let classNames = ''
    if (completed) {
      classNames = 'completed'
    }
    if (editing) {
      classNames = 'editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button></button>
              <button
                className="icon icon-play"
                onClick={() => {
                  this.setState({ play: true, active: true })
                  this.timer()
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={() => {
                  this.setState({ play: false })
                }}
              ></button>
              {min}:{sec}
            </span>
            <span className="description">
              created{' '}
              {formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <input
            type="text"
            className="edit"
            defaultValue={label}
            onChange={this.onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.state.label.length > 0 ? saveItem(id, this.state.label) : saveItem(id, label)
              }
            }}
          />
        ) : (
          false
        )}
      </li>
    )
  }
}
