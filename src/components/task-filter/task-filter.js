import React, { Component } from 'react'
import { func, string } from 'prop-types'
import './task-filter.css'

export default class TaskFilter extends Component {
  static defaultProps = {
    statusFilter: 'All',
  }
  static propTypes = {
    statusFilter: string,
    filterChange: func.isRequired,
  }
  render() {
    const { filterChange, statusFilter } = this.props
    return (
      <ul className="filters">
        <li>
          <button className={statusFilter === 'All' ? 'selected' : ''} onClick={() => filterChange('All')}>
            All
          </button>
        </li>
        <li>
          <button className={statusFilter === 'Active' ? 'selected' : ''} onClick={() => filterChange('Active')}>
            Active
          </button>
        </li>
        <li>
          <button className={statusFilter === 'Completed' ? 'selected' : ''} onClick={() => filterChange('Completed')}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
