import React, { Component } from 'react'
import { func, number, string } from 'prop-types'

import './footer.css'
import TaskFilter from '../task-filter'

export default class Footer extends Component {
  static defaultProps = {
    active: 0,
    statusFilter: 'All',
  }
  static propTypes = {
    active: number,
    clearCompleted: func.isRequired,
    statusFilter: string,
    filterChange: func.isRequired,
  }
  render() {
    const { active, filterChange, clearCompleted, statusFilter } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{active} items left</span>
        <TaskFilter filterChange={filterChange} statusFilter={statusFilter} />
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    )
  }
}
