import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { changeTodo, deleteTodo, toggleTodo } from '../redux/actions/actions';
import PropTypes from 'prop-types'
import s from '../index.module.sass'
import {useHttp} from "../hooks/http.hook";

export const Item = ({ todo }) => {
  const dispatch = useDispatch();
  const {request} = useHttp();
  const user = useSelector(state => state.user);
  const [text, setText] = useState(todo.text ?? 'error text');
  const [state, setState] = useState(false);

  const handlerInput = ({ target }) => {
    setText(target.value);
  };

  const handlerChange = () => {
    if (!text.trim()) {
      return;
    }

    if (state) {
      request(`/api/todos/users/${user.id}/change/text/${todo.id}`, 'POST', {text})
      dispatch(changeTodo({ text, id: todo.id }));
    }

    setState(!state);
  };

  return (
    <li
      className={
        todo?.completed ? `${s['collection-item']} ${s['completed']}` : s['collection-item']
      }
    >
      <label
        onChange={() => {
          request(`/api/todos/users/${user.id}/change/completed/${todo.id}`, 'POST', {completed: !todo.completed})
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

      <div className={s["icons"]}>
        <i className="material-icons" onClick={() => handlerChange()}>
          create
        </i>
        <i className="material-icons" onClick={() => {
          request(`/api/todos/users/${user.id}/delete/${todo.id}`, 'GET')
          dispatch(deleteTodo(todo.id))
        }}>
          cancel
        </i>
      </div>
    </li>
  );
};

Item.propTypes = {
  todo: PropTypes.object,
}
