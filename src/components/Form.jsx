import React, { useState } from 'react';
import { addTodo } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';

export const Form = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const handlerInput = ({ target }) => setText(target.value);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 5) return;

    const newTodo = {
      text: text.trim(),
      id: Date.now().toString(),
      completed: false
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
