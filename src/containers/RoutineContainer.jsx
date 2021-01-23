import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routine from '../components/Routine';
import { getEdit, getLogout, getRemove, getStart } from '../modules/getRoutine';
import { logoutStart } from '../modules/logout';
import { newRemove } from '../modules/newRoutine';
import { loginremove } from '../modules/user';
import { signupRemove } from '../modules/userSign';
const RoutineContainer = props => {
  const dispatch = useDispatch();
  const routines = useSelector(state => state.routine);

  const getRoutine = () => dispatch(getStart());
  const removeRoutine = id => dispatch(getRemove(id));
  const editRoutine = (id, text) => dispatch(getEdit(id, text));
  const history = props.history;
  const onLogout = () => {
    dispatch(newRemove());
    dispatch(getLogout());
    dispatch(loginremove());
    dispatch(signupRemove());
    dispatch(logoutStart());
  };

  return (
    <Routine
      history={history}
      routines={routines}
      onLogout={onLogout}
      getRoutine={getRoutine}
      removeRoutine={removeRoutine}
      editRoutine={editRoutine}
    />
  );
};

export default RoutineContainer;
