import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const { onItemAdded } = props;

  const onLableChange = (e) => {
    setLabel(e.target.value);
  };
  const onMinChange = (e) => {
    if (e.target.value < 60) {
      setMin(e.target.value < 10 ? `0${e.target.value}` : e.target.value);
      setSec(sec > 10 ? sec : '00');
    } else {
      setMin('60');
    }
  };
  const onSecChange = (e) => {
    let format = e.target.value.split('');

    if (format.length > 2 && format[0] === 0) {
      format.splice(0, format.length - 2);
    }
    if (e.target.value < 60) {
      setSec(e.target.value < 10 ? `0${e.target.value}` : e.target.value);
      setMin(min > 0 ? min : '00');
    } else {
      setSec('60');
    }
  };
  const formatTime = (value) => {
    let arr = value.split('');
    let i = arr.slice(arr.length - 2, arr.length);
    return i.join('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onItemAdded(label, formatTime(min), formatTime(sec));
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          onChange={onLableChange}
          onKeyDown={onKeyDown}
          placeholder="What needs to be done?"
          value={label}
        ></input>
        <input
          type="number"
          onChange={onMinChange}
          onKeyDown={onKeyDown}
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
        />
        <input
          type="number"
          onChange={onSecChange}
          onKeyDown={onKeyDown}
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
        />
      </form>
    </header>
  );
};

export default NewTaskForm;
