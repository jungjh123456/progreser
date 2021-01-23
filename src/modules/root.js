import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import userInfo, { userSaga } from './user';
import { connectRouter } from 'connected-react-router';
import signinfo, { signupSaga } from './userSign';
import { reducer as formReducer } from 'redux-form';
import routine, {
  watchGetRoutineSaga,
  watchEditRoutineSaga,
  watchNewRoutineSaga,
  watchRemoveRoutineSaga,
} from './getRoutine';
import { LogoutRoutineSaga } from './logout';

export const rootReducer = history =>
  combineReducers({
    userInfo,
    signinfo,
    routine,
    router: connectRouter(history),
  });

// 사가 합치기
export function* rootSaga() {
  yield all([
    userSaga(),
    signupSaga(),
    watchNewRoutineSaga(),
    watchRemoveRoutineSaga(),
    watchEditRoutineSaga(),
    watchGetRoutineSaga(),
    watchRemoveRoutineSaga(),
    watchEditRoutineSaga(),
    LogoutRoutineSaga(),
  ]);
}
