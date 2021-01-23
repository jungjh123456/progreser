import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';

const LOGOUTSTART = 'logoutRoutine/START';
const LOGOUTFAIL = 'logoutRoutine/FAIL';

export const logoutStart = createAction(LOGOUTSTART);
const logoutfail = createAction(LOGOUTFAIL);

function* LogoutSaga() {
  try {
    console.log('sdfds');
    localStorage.removeItem('token');

    yield put(push('/login'));
  } catch (error) {
    console.log(error);
    yield put(logoutfail(error));
  }
}

export function* LogoutRoutineSaga() {
  yield takeEvery(LOGOUTSTART, LogoutSaga);
}
