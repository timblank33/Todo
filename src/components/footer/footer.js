import React from 'react';
import { func, number, string } from 'prop-types';

import './footer.css';
import TaskFilter from '../task-filter';

const Footer = (props) => {
  Footer.defaultProps = {
    active: 0,
    statusFilter: 'All',
  };
  Footer.propTypes = {
    active: number,
    clearCompleted: func.isRequired,
    statusFilter: string,
    filterChange: func.isRequired,
  };

  const { active, filterChange, clearCompleted, statusFilter } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{active} items left</span>
      <TaskFilter filterChange={filterChange} statusFilter={statusFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
export default Footer;
