// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import NewRoutine from '../components/NewRoutine';
// import { newStart } from '../modules/getRoutine';

// const NewRoutineContainer = ({ history }) => {
//   const token = localStorage.getItem('token');
//   const dispatch = useDispatch();
//   if (token === null) {
//     return <Redirect to="/login" />;
//   }

//   const onRoutine = routine => {
//     dispatch(newStart(routine));
//   };
//   return <NewRoutine history={history} onRoutine={onRoutine} />;
// };

// export default NewRoutineContainer;
