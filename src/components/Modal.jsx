import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userChange } from '../redux/actions/user';
import { apiRegisterUser } from '../http.actions';

export const Modal = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const redirectAuth = (status) => (status ? <Redirect to="/" /> : '');

  const authorize = async () => {
    const response = await request(apiRegisterUser(), 'POST', {
      login,
      password,
    });
    if (!response.errors) {
      dispatch(userChange(response));
      localStorage.setItem('user', JSON.stringify(response));
      return setStatus(true);
    }
    alert(response.errors);
  };

  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card blue-grey darken-3 ">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div className="container">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={login}
                    name="login"
                    type="text"
                    className="validate"
                    onChange={({ target }) => {
                      setLogin(target.value);
                    }}
                  />
                  <label className="active">LogIn</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={password}
                    name="password"
                    type="text"
                    className="validate"
                    onChange={({ target }) => {
                      setPassword(target.value);
                    }}
                  />
                  <label className="active">Password</label>
                </div>
              </div>
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
