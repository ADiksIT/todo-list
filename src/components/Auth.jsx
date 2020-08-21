import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userChange, userStatus } from '../redux/actions/user';
import { useHttp } from '../hooks/http.hook';
import { apiRegisterUser } from '../utils/http.actions';
import { Input } from "./Input";

export const Modal = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();

  const { request } = useHttp();

  const redirectAuth = (status) => (status ? <Redirect to="/list" /> : '');

  const authorize = async () => {

    if (login.trim() === '' || password.trim() === '') {
      alert('Input should not be empty')
      return
    }

    const response = await request(apiRegisterUser(), 'POST', {login, password});

    if (!response.errors) {
      dispatch(userChange(response));
      dispatch(userStatus());
      return setStatus(true);
    }

    alert(response.errors);
  };

  const inputHandle = ({target}) => target.name === 'login' ? setLogin(target.value.trim()) : setPassword(target.value.trim())

  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card blue-grey darken-3 ">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div className="container">
              <Input onChange={inputHandle} value={login} name={'login'} className='validate'/>
              <Input onChange={inputHandle} value={password} name={'password'} className='validate'/>
            </div>
          </div>
          <div className="card-action">
            {redirectAuth(status)}
            <a onClick={() => authorize()}>Authorize</a>
          </div>
        </div>
      </div>
    </div>
  );
};
