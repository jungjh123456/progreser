import React from 'react';
import { useDispatch } from 'react-redux';
import Login from '../components/Login';
import { loginStart } from '../modules/user';

const LoginContainer = props => {
  const dispatch = useDispatch();
  const history = props.history;
  const onLogin = (id, pass) => dispatch(loginStart(id, pass));
  return <Login history={history} onLogin={onLogin} />;
};

export default LoginContainer;
