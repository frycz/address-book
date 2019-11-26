import { SagaIterator } from "redux-saga";
import { takeLatest, put, all, call } from "redux-saga/effects";
import UserService, { User } from "../../services/userService";
import { GetUsersAction } from "./actions";
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
  } from "./actions";

export function* getUsers(action: GetUsersAction): SagaIterator {
    try {
      const users: User[] = yield call(UserService.getUsers);
      yield put({
        type: GET_USERS_SUCCESS,
        users
      });
    } catch (err) {
      yield put({
        type: GET_USERS_ERROR
      });
    }
  }
  
  export default function* rootSaga() {
    yield all([
      takeLatest(GET_USERS, getUsers)
    ]);
  }