import React, { Component } from 'react'
import { func, string, number, instanceOf, bool } from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    label: '',
  }
  static defaultProps = {
    completed: false,
    editing: false,
  }

  static propTypes = {
    id: number.isRequired,
    label: string.isRequired,
    completed: bool,
    editing: bool,
    date: instanceOf(Date),
    onToggleEditing: func.isRequired,
    onDeleted: func.isRequired,
    onToggleCompleted: func.isRequired,
    saveItem: func.isRequired,
  }
  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  render() {
    const { id, label, date, onDeleted, onToggleCompleted, onToggleEditing, completed, editing, saveItem } = this.props
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
            <span className="description">{label}</span>
            <span className="created">
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
                this.state.label.length > 0 ? saveItem(id, this.state.label) : saveItem(id, this.props.label)
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
