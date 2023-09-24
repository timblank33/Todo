import React from 'react';
import { func, string } from 'prop-types';
import './task-filter.css';

const TaskFilter = (props) => {
  TaskFilter.defaultProps = {
    statusFilter: 'All',
  };
  TaskFilter.propTypes = {
    statusFilter: string,
    filterChange: func.isRequired,
  };

  const { filterChange, statusFilter } = props;
  return (
    <ul className="filters">
      <li>
        <button
          className={statusFilter === 'All' ? 'selected' : ''}
          onClick={() => {
            filterChange('All');
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={statusFilter === 'Active' ? 'selected' : ''}
          onClick={() => filterChange('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={statusFilter === 'Completed' ? 'selected' : ''}
          onClick={() => {
            filterChange('Completed');
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
export default TaskFilter;
