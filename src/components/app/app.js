import React, { useState, useEffect } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

const App = (props) => {
  let maxId = 1;
  const createTaskItem = (label, min, sec) => {
    return {
      label,
      editing: false,
      completed: false,
      checked: false,
      id: maxId++,
      date: new Date(),
      min,
      sec,
    };
  };
  const [todoData, setTodoData] = useState([
    createTaskItem('coffe', '10', '06'),
    createTaskItem('coffes'),
    createTaskItem('coffesen'),
  ]);

  const [statusFilter, setStatusFilter] = useState('All');

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);

    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

    setTodoData(newArr);
  };

  const updateItem = (id, min, sec, play, active) => {
    const newArr = [...todoData].map((item) => {
      if (item.id === id) {
        item.sec = sec;
        item.min = min;
        item.play = play;
        item.active = active;
      }
      return item;
    });

    setTodoData(newArr);
  };
  const saveItem = (id, text) => {
    const newArr = [...todoData].map((item) => {
      if (item.id === id) {
        item.label = text;
        item.editing = false;
      }
      return item;
    });

    setTodoData(newArr);
  };

  const addItem = (text, min, sec) => {
    const newItem = createTaskItem(text, min, sec);
    const newArr = [...todoData, newItem];
    setTodoData(newArr);
  };

  const onToggleCompleted = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = {
      ...oldItem,
      completed: !oldItem.completed,
    };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];

    setTodoData(newArr);
  };
  const onToggleEditing = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, editing: !oldItem.editing };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];

    // setTodoData(newArr);
  };
  const clearCompleted = () => {
    const completed = todoData.filter((item) => {
      return !item.completed;
    });

    setTodoData(completed);
  };

  const filterChange = (status) => {
    setStatusFilter(status);
  };

  const filterTask = (arr, status) => {
    if (status !== 'All') {
      const newArr = arr.filter((item) => {
        if (status === 'Active') {
          return !item.completed;
        }
        return item.completed;
      });
      return newArr;
    }
    return arr;
  };
  console.log(todoData);
  const active = todoData.filter((item) => !item.completed && !item.editing);
  const renderTodo = filterTask(todoData, statusFilter);

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={renderTodo}
          updateItem={updateItem}
          onDeleted={deleteItem}
          saveItem={saveItem}
          onToggleCompleted={onToggleCompleted}
          onToggleEditing={onToggleEditing}
        />
        <Footer
          filterChange={filterChange}
          clearCompleted={clearCompleted}
          active={active.length}
          statusFilter={statusFilter}
        />
      </section>
    </section>
  );
};

export default App;
