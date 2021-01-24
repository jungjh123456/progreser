import { inject, observer } from 'mobx-react';
import React from 'react';
import NewRoutine from '../components/NewRoutine';

export default inject('RoutineStore')(
  observer(({ RoutineStore }) => {
    const addMobRoutine = routine => {
      RoutineStore.addRoutine(routine);
      console.log(RoutineStore.routines);
    };
    return <NewRoutine addMobRoutine={addMobRoutine} />;
  }),
);

// const RoutineContainer = props => {
//   // const dispatch = useDispatch();
//   // const routines = useSelector(state => state.routine);

//   // const getRoutine = () => dispatch(getStart());
//   // const removeRoutine = id => dispatch(getRemove(id));
//   // const editRoutine = (id, text) => dispatch(getEdit(id, text));
//   // const history = props.history;
//   // const onLogout = () => {
//   //   dispatch(newRemove());
//   //   dispatch(getLogout());
//   //   dispatch(loginremove());
//   //   dispatch(signupRemove());
//   //   dispatch(logoutStart());
//   // };

//   return (
//     <Routine
//       history={history}
//       routines={routines}
//       onLogout={onLogout}
//       getRoutine={getRoutine}
//       removeRoutine={removeRoutine}
//       editRoutine={editRoutine}
//     />
//   );
// };

// export default RoutineContainer;
