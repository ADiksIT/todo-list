import React, { useState } from 'react';
import { addTodo } from '../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useHttp} from "../hooks/http.hook";

export const Form = () => {
  const [text, setText] = useState('');

  const {id} = useSelector(state => state.user)
  const dispatch = useDispatch();

  const {request} = useHttp()

  const handlerInput = ({ target }) => setText(target.value);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!id) return alert('Войдите вначале в систему!!!')

    if (text.trim().length < 5) return;

    const newTodo = {
      text: text.trim(),
      id: Date.now().toString(),
      completed: false
    }

    request(`/api/todos/users/${id}`, 'POST', newTodo)
    dispatch(addTodo(newTodo));
    setText('');
  };

  return (
    <div className="row">
      <form action="submit" onSubmit={handlerSubmit}>
        <div className="file-field input-field">
          <button className="btn" type="submit">
            <span>Add</span>
          </button>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              value={text}
              onChange={handlerInput}
              type="text"
              placeholder="Add your todo (min 5 symbols)"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
