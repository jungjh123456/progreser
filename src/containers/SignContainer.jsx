import React from 'react';
import { useDispatch } from 'react-redux';
import Signup from '../components/Signup';
import { signupStart } from '../modules/userSign';

const SignupContainer = () => {
  const dispatch = useDispatch();
  const onSign = user => dispatch(signupStart(user));
  return <Signup onSign={onSign} />;
};

export default SignupContainer;
