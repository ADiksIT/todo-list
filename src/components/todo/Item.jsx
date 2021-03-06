import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodo, deleteTodo, toggleTodo } from '../../redux/actions/todos';
import PropTypes from 'prop-types';
import s from '../../index.module.sass';
import { useHttp } from '../../hooks/http.hook';
import { Draggable } from 'react-beautiful-dnd';
import {
  apiChangeTextTodo,
  apiDeleteTodo,
  apiChangeCompletedTodo,
} from '../../utils/http.actions';
import { GroupBtnTodo } from "./GroupBtnTodo";

export const Item = ({ todo, index }) => {
  const [text, setText] = useState(todo?.text ?? 'error text');
  const [state, setState] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { request } = useHttp();

  const handlerInput = ({ target }) => {
    setText(target.value);
  };

  const handlerChangeCompleted = () => {
    if (user.auth) {
      request(apiChangeCompletedTodo(user.id, todo.id), 'POST', {
        completed: !todo.completed,
      });
    }

    dispatch(toggleTodo(todo.id));
  }

  const handlerChange = () => {
    if (!text.trim()) {
      return;
    }

    if (state) {
      if (user.auth) {
        request(apiChangeTextTodo(user.id, todo.id), 'POST', { text });
      }
      dispatch(changeTodo({ text, id: todo.id }));
    }

    setState(!state);
  };

  const handlerDeleteTodo = () => {
    if (user.auth) {
      request(apiDeleteTodo(user.id, todo.id), 'GET');
    }
    dispatch(deleteTodo(todo.id));
  }

  const buttonsData = [{text: 'create', onClick: handlerChange}, {text: 'delete', onClick: handlerDeleteTodo}]

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
          <label onChange={() => handlerChangeCompleted()} >
            <input type="checkbox" defaultChecked={todo.completed} />
            <span>''</span>
          </label>

          {state ? (
            <form action="#" onSubmit={(e) => {
                e.preventDefault();
                handlerChange();
              }}
            >
              <input type="text" value={text}
                onChange={(e) => handlerInput(e)}
                onFocus={(e) => e.target.select()}
              />
            </form>
          ) : (
            <span>{text}</span>
          )}

          <GroupBtnTodo data={buttonsData} className={s['icons']}/>

        </li>
      )}
    </Draggable>
  );
};

Item.propTypes = {
  todo: PropTypes.object,
};
