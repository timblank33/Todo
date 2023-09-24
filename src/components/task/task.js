import React, { useState, useEffect } from 'react';
import { func, string, instanceOf, bool } from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Task = (props) => {
  Task.propTypes = {
    id: string.isRequired,
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
  };

  const [labelInput, setLabelInput] = useState('');
  const [play, setPlay] = useState(true);
  const [active, setActive] = useState(false);
  const [min, setMin] = useState(props.min);
  const [sec, setSec] = useState(props.sec);
  let {
    id,
    label,
    date,
    onDeleted,
    onToggleCompleted,
    onToggleEditing,
    completed,
    editing,
    saveItem,
    updateItem,
  } = props;

  useEffect(() => {
    if (Number(min) === 0 && Number(sec) === 0 && !completed) {
      setPlay(false);
    }
    const interval = setInterval(() => {
      if (active && play) {
        if (play && sec > 0) {
          timerS(sec);
        } else if (play && Number(sec) === 0 && min > 0) {
          timerM(min);
          setSec('59');
        }
      }
    }, 1000);

    updateItem(id, min, sec, play, active);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, sec, play, active, completed]);

  const onChange = (e) => {
    setLabelInput(e.target.value);
  };
  const timerState = (min, sec) => {
    setMin(min);
    setSec(sec);
  };
  const timerS = (props) => {
    if (props <= 10 && props > 0) setSec(`0${props - 1}`);
    else if (props > 0) setSec(String(props - 1));
  };
  const timerM = (props) => {
    if (props <= 10 && props > 0) timerState(`0${props - 1}`, '59');
    else if (props > 0) timerState(String(props - 1), '59');
  };

  let classNames = '';
  if (completed) {
    classNames = 'completed';
  }
  if (editing) {
    classNames = 'editing';
  }
  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onToggleCompleted}
          checked={completed}
        />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button></button>
            <button
              className="icon icon-play"
              onClick={() => {
                setPlay(true);
                setActive(true);
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={() => {
                setPlay(false);
                setActive(true);
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
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              labelInput.length > 0
                ? saveItem(id, labelInput)
                : saveItem(id, label);
            }
          }}
        />
      ) : (
        false
      )}
    </li>
  );
};

export default Task;
