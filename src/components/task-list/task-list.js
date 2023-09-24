import React from 'react';
import { array, func } from 'prop-types';

import Task from '../task';
import './task-list.css';

const TaskList = (props) => {
  TaskList.defaultProps = {
    todos: [],
  };
  TaskList.propTypes = {
    onDeleted: func.isRequired,
    onToggleCompleted: func.isRequired,
    onToggleEditing: func.isRequired,
    saveItem: func.isRequired,
    todos: array,
  };

  const {
    todos,
    onDeleted,
    onToggleCompleted,
    onToggleEditing,
    saveItem,
    updateItem,
  } = props;
  const elements = todos.map((item) => {
    const { id } = item;
    return (
      <Task
        {...item}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        saveItem={saveItem}
        updateItem={updateItem}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;
