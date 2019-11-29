import { SagaIterator } from "redux-saga";
import { takeLeading, put, all, call, select } from "redux-saga/effects";
import UserService, {
  User,
  Countries as ServiceCountries
} from "../../services/userService";
import { batchSize, catalogueSize } from "../../config";
import { GetUsersAction } from "./actions";
import { Countries as ReduxCountries } from "./types";
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from "./actions";

const mapReduxToServiceCountries = (
  countries: ReduxCountries
): ServiceCountries => {
  const serviceCountries: string[] = [];
  return Object.entries(countries).reduce((acc, [country, isSelected]) => {
    isSelected && acc.push(country);
    return acc;
  }, serviceCountries);
};

const getNextLoadedPage = (
  currentLoadedPage: number,
  displayedPage: number,
  reset?: boolean
) => {
  if (reset) {
    return 1;
  }

  return currentLoadedPage <= displayedPage
    ? currentLoadedPage + 1
    : currentLoadedPage;
};

const isNextLoadedPageValid = (
  nextLoadedPage: number,
  currentLoadedPage: number,
  maxPage: number
) =>
  (nextLoadedPage === 1 || nextLoadedPage === currentLoadedPage + 1) &&
  nextLoadedPage <= maxPage;

export function* getUsers(action: GetUsersAction): SagaIterator {
  const serviceCountries = mapReduxToServiceCountries(action.countries);

  const displayedPage = yield select(state => state.book.currentPage);
  const currentLoadedPage = yield select(state => state.book.users.length);
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
