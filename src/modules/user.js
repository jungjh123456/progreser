import axios from 'axios';
import { push } from 'connected-react-router';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';

// const prefix = 'progeser/user';

// Action 타입 만들기
const LOGINSTART = 'login/START';
const LOGINSUCCESS = 'login/SUCCESS';
const LOGINFAIL = 'login/FAIL';
const LOGINREMOVE = 'login/remove';

export const loginStart = createAction(LOGINSTART, (id, pass) => ({ id, pass }));
const loginSuccess = createAction(LOGINSUCCESS, (id, pass) => ({ id, pass }));
const loginfail = createAction(LOGINFAIL);
export const loginremove = createAction(LOGINREMOVE);

// 리듀서함수제작
const userinfo = handleActions(
  {
    [LOGINSTART]: state => ({ ...state }),
    [LOGINSUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [LOGINFAIL]: state => ({ ...state }),
    [LOGINREMOVE]: state => (state = {}),
  },
  {},
);

export default userinfo;

function* loginSaga({ payload }) {
  try {
    const loginUser = yield call(axios.get, `/users/${payload.id}`);
    if (loginUser.data.pass !== payload.pass) {
      throw new Error('비밀번호가 달라요');
    }
    console.log(payload);
    const userPayload = {
      id: payload.id,
    };
    yield put(loginSuccess(userPayload));
    const user = { id: loginUser.data.id, name: loginUser.data.name };
    localStorage.setItem('token', JSON.stringify(user));
    yield put(push('/'));
    console.log(localStorage.getItem('token'));
  } catch (error) {
    yield put(loginfail(error));
  }
}
export function* userSaga() {
  yield takeEvery(LOGINSTART, loginSaga);
}
