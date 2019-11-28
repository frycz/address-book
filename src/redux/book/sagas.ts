import { SagaIterator } from "redux-saga";
import { takeLatest, put, all, call, select } from "redux-saga/effects";
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

export function* getUsers(action: GetUsersAction): SagaIterator {
  const serviceCountries = mapReduxToServiceCountries(action.countries);

  const currentPage = yield select(state => state.book.currentPage);
  const maxPage = catalogueSize / batchSize;
  let nextPage = action.page || currentPage + 1;
  nextPage = nextPage <= maxPage ? nextPage : maxPage + 1;

  try {
    const users: User[] =
      nextPage <= maxPage
        ? yield call(UserService.getUsers, serviceCountries, nextPage)
        : [];

    nextPage = users.length ? nextPage : maxPage;
    yield put({
      type: GET_USERS_SUCCESS,
      users,
      page: nextPage
    });
  } catch (err) {
    yield put({
      type: GET_USERS_ERROR
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(GET_USERS, getUsers)]);
}
