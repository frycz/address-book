import { SagaIterator } from "redux-saga";
import { takeLeading, put, all, call, select } from "redux-saga/effects";
import UserService, { User } from "../../services/userService";
import { batchSize, catalogueSize } from "../../config";
import { GetUsersAction } from "./actions";
import { getDisplayedPage, getLoadedPage } from "./selectors";
import {
  mapReduxToServiceCountries,
  getNextLoadedPage,
  isNextLoadedPageValid
} from "./utils";
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from "./actions";

export function* getUsers(action: GetUsersAction): SagaIterator {
  const serviceCountries = mapReduxToServiceCountries(action.countries);

  const displayedPage = yield select(getDisplayedPage);
  const currentLoadedPage = yield select(getLoadedPage);
  const maxPage = catalogueSize / batchSize;

  const nextLoadedPage = getNextLoadedPage(
    currentLoadedPage,
    displayedPage,
    action.reset
  );

  if (action.reset) {
    yield put({
      type: GET_USERS_SUCCESS,
      users: [],
      reset: action.reset
    });
  }

  if (isNextLoadedPageValid(nextLoadedPage, currentLoadedPage, maxPage)) {
    try {
      const users: User[] = yield call(
        UserService.getUsers,
        serviceCountries,
        nextLoadedPage
      );
      yield put({
        type: GET_USERS_SUCCESS,
        users,
        reset: action.reset
      });
    } catch (err) {
      yield put({
        type: GET_USERS_ERROR
      });
    }
  }
}

export default function* rootSaga() {
  yield all([takeLeading(GET_USERS, getUsers)]);
}
