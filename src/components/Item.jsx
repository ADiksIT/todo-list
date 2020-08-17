import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodo, deleteTodo, toggleTodo } from '../redux/actions/actions';
import PropTypes from 'prop-types';
import s from '../index.module.sass';
import { useHttp } from '../hooks/http.hook';
import { Draggable } from 'react-beautiful-dnd';
import {
  apiChangeTextTodo,
  apiDeleteTodo,
  apiChangeCompletedTodo,
} from '../http.actions';

export const Item = ({ todo, index }) => {
  const [text, setText] = useState(todo?.text ?? 'error text');
  const [state, setState] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { request } = useHttp();

  const handlerInput = ({ target }) => {
    setText(target.value);
  };

  const handlerChange = () => {
    if (!text.trim()) {
      return;
    }

    if (state) {
      request(apiChangeTextTodo(user.id, todo.id), 'POST', { text });
      dispatch(changeTodo({ text, id: todo.id }));
    }

    setState(!state);
  };

  return (
    <Draggable draggableId={todo.id} index={index} key={index}>
      {(provided) => (
        <li
          className={
            todo?.completed
              ? `${s['collection-item']} ${s['completed']}`
              : s['collection-item']
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <label
            onChange={() => {
              request(apiChangeCompletedTodo(user.id, todo.id), 'POST', {
                completed: !todo.completed,
              });
              dispatch(toggleTodo(todo.id));
            }}
          >
            <input type="checkbox" defaultChecked={todo.completed} />
            <span>''</span>
          </label>

          {state ? (
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                handlerChange();
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => handlerInput(e)}
                onFocus={(e) => e.target.select()}
              />
            </form>
          ) : (
            <span>{text}</span>
          )}

          <div className={s['icons']}>
            <i className="material-icons" onClick={() => handlerChange()}>
              create
            </i>
            <i
              className="material-icons"
              onClick={() => {
                request(apiDeleteTodo(user.id, todo.id), 'GET');
                dispatch(deleteTodo(todo.id));
              }}
            >
              cancel
            </i>
          </div>
        </li>
      )}
    </Draggable>
  );
};

Item.propTypes = {
  todo: PropTypes.object,
};
