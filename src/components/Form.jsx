import React, { useState } from 'react';
import { addTodo } from '../redux/actions/todos';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../hooks/http.hook';
import { apiAddTodo } from '../utils/http.actions';
import {Input} from "./Input";

export const Form = () => {
  const [text, setText] = useState('');

  const { id, auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const handlerInput = ({ target }) => setText(target.value);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 5) return alert('Todo must have at least five symbols')

    const newTodo = {
      text: text.trim(),
      id: Date.now().toString(),
      completed: false,
    };

    if (auth) {
      request(apiAddTodo(id), 'POST', newTodo)
    }

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
            <Input
                name='Todo'
                value={text}
                onChange={handlerInput}
                placeholder='Add your todo (min 5 symbols)'
                className='file-path validate'
            />
          </div>
        </div>
      </form>
    </div>
  );
};
