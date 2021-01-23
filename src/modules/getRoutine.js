import { createAction, handleActions } from 'redux-actions';
import axios from '../../node_modules/axios/index';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

const GETNEW = 'routine/NEW';
const GETSTART = 'getRoutine/START';
const GETSUCCESS = 'getRoutine/SUCCESS';
const GETFAIL = 'getRoutine/FAIL';
const GETREMOVE = 'getRoutine/REMOVE';
const GETLOGOUT = 'getLogout/LOGOUT';
const GETEDIT = 'getRoutine/EDIT';
const GETADD = 'getRoutine/ADD';

export const newStart = createAction(GETNEW, routine => routine);
export const getStart = createAction(GETSTART);
const getSuccess = createAction(GETSUCCESS, routine => routine);
const getfail = createAction(GETFAIL);
export const getRemove = createAction(GETREMOVE, routineId => routineId);
export const getEdit = createAction(GETEDIT, (routineId, routineText) => ({
  routineId,
  routineText,
}));
export const getLogout = createAction(GETLOGOUT);

// 리듀서함수제작
const routine = handleActions(
  {
    [GETSTART]: state => state,
    [GETNEW]: state => state,
    [GETREMOVE]: state => state,
    [GETEDIT]: state => state,
    [GETSUCCESS]: (state, { payload }) => payload,
    [GETFAIL]: state => state,
    [GETLOGOUT]: state => (state = []),
  },
  [],
);

export default routine;

function* getRoutineSaga() {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const res = yield call(axios.get, `/users/${id}`);
    yield put(getSuccess(res.data.routines));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

function* editRoutineSaga({ payload: { routineId, routineText } }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.routine);
    const newState = prevState.map(routine => {
      return routineId === routine.id ? { ...routine, routine: routineText } : routine;
    });
    yield call(axios.patch, `/users/${id}`, { routines: newState });
    yield put(getSuccess(newState));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

function* removeRoutineSaga({ payload: routineId }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.routine);
    const newState = prevState.filter(routine => routine.id !== routineId);
    yield call(axios.patch, `/users/${id}`, { routines: newState });
    yield put(getSuccess(newState));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

function* newRoutineSaga({ payload }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.routine);
    const newState = [...prevState, payload];
    yield call(axios.patch, `/users/${id}`, { routines: newState });
    yield put(getSuccess(newState));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(getfail(error));
  }
}

export function* watchGetRoutineSaga() {
  yield takeEvery(GETSTART, getRoutineSaga);
}
export function* watchRemoveRoutineSaga() {
  yield takeEvery(GETREMOVE, removeRoutineSaga);
}
export function* watchEditRoutineSaga() {
  yield takeEvery(GETEDIT, editRoutineSaga);
}
export function* watchNewRoutineSaga() {
  yield takeEvery(GETNEW, newRoutineSaga);
}
