import { createAction, handleActions } from 'redux-actions';
import axios from '../../node_modules/axios/index';
import { push } from 'connected-react-router';
import { call, put, takeEvery, select } from 'redux-saga/effects';

const NEWSTART = 'newRoutine/START';
const NEWSUCCESS = 'newRoutine/SUCCESS';
const NEWFAIL = 'newRoutine/FAIL';
const NEWREMOVE = 'newRoutine/REMOVE';

export const newStart = createAction(NEWSTART, routine => routine);
const newSuccess = createAction(NEWSUCCESS, routine => routine);
export const newRemove = createAction(NEWREMOVE);
const newfail = createAction(NEWFAIL);

// 리듀서함수제작
const newRoutine = handleActions(
  {
    [NEWSTART]: state => state,
    [NEWSUCCESS]: (state, { payload }) => [...state, payload],
    [NEWFAIL]: state => state,
    [NEWREMOVE]: state => (state = []),
  },
  [],
);

export default newRoutine;

function* newRoutineSaga({ payload }) {
  try {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const prevState = yield select(state => state.newRoutine);
    console.log(prevState);
    yield call(axios.patch, `/users/${id}`, { routines: [...prevState, payload] });
    yield put(newSuccess(payload));
    console.log(prevState);
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(newfail(error));
  }
}

export function* watchNewRoutineSaga() {
  yield takeEvery(NEWSTART, newRoutineSaga);
}
