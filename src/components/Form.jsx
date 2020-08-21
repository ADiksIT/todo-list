import React, { useState } from 'react';
import { addTodo } from '../redux/actions/todos';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useHttp } from '../hooks/http.hook';
import { apiAddTodo } from '../utils/http.actions';
import { Input} from "./Input";

export const Form = () => {
  const [text, setText] = useState('');

  const { id, auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {t} = useTranslation('common');

  const { request } = useHttp();

  const handlerInput = ({ target }) => setText(target.value);

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length < 5) return alert(t('form.alert'))

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
            <span>{t('form.btn')}</span>
          </button>
          <div className="file-path-wrapper">
            <Input
                name={t('form.label')}
                value={text}
                onChange={handlerInput}
                placeholder={t('form.placeholder')}
                className='file-path validate'
            />
          </div>
        </div>
      </form>
    </div>
  );
};
