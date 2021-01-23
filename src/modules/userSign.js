import { createAction, handleActions } from 'redux-actions';
import axios from '../../node_modules/axios/index';
import { push } from 'connected-react-router';
import { call, put, takeEvery } from 'redux-saga/effects';

const SIGNUPSTART = 'sign/START';
const SIGNUPSUCCESS = 'sign/SUCCESS';
const SIGNUPFAIL = 'sign/FAIL';
const SIGNUPREMOVE = 'sign/REMOVE';

export const signupStart = createAction(SIGNUPSTART, user => user);
const signupSuccess = createAction(SIGNUPSUCCESS, user => user);
const signupFail = createAction(SIGNUPFAIL);
export const signupRemove = createAction(SIGNUPREMOVE);

const signinfo = handleActions(
  {
    [SIGNUPSTART]: state => ({ ...state }),
    [SIGNUPSUCCESS]: (_, { payload }) => ({
      ...payload,
    }),
    [SIGNUPFAIL]: (state, { payload }) => ({ ...state, error: payload }),
    [SIGNUPREMOVE]: state => (state = {}),
  },
  {},
);

export default signinfo;

function* signSaga({ payload }) {
  try {
    const loginUser = yield call(axios.get, `/users`);
    console.log(payload['user-id']);
    if (loginUser.data.id === payload['user-id']) return;
    const signuser = {
      id: payload['user-id'],
      name: payload['user-name'],
      pass: payload['user-pass'],
      birth: payload['user-birth'],
      routine: [],
    };
    const stateUser = {
      id: payload['user-id'],
      name: payload['user-name'],
      birth: payload['user-birth'],
      routine: [],
    };
    yield call(axios.post, `/users`, signuser);
    yield put(signupSuccess(stateUser));
    yield put(push('/login'));
  } catch (error) {
    yield put(signupFail(error));
  }
}

export function* signupSaga() {
  yield takeEvery(SIGNUPSTART, signSaga);
}
