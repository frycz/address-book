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

export function* getUsers(action: GetUsersAction): SagaIterator {
  const serviceCountries = mapReduxToServiceCountries(action.countries);

  const displayedPage = yield select(state => state.book.currentPage);
  console.log('getusers displayedPage', displayedPage)
  const currentLoadedPage = yield select(state => state.book.users.length);
  console.log('getusers currentLoadedPage', currentLoadedPage)

  const maxPage = catalogueSize / batchSize;
  let nextLoadedPage =
    (action.reset && 1) ||
    (currentLoadedPage <= displayedPage
      ? currentLoadedPage + 1
      : currentLoadedPage);
  nextLoadedPage = nextLoadedPage <= maxPage ? nextLoadedPage : maxPage + 1;

  console.log('getusers nextLoadedPage', nextLoadedPage)

  try {
    const users: User[] =
      (nextLoadedPage === 1 || nextLoadedPage === currentLoadedPage + 1) && nextLoadedPage <= maxPage
        ? yield call(UserService.getUsers, serviceCountries, nextLoadedPage)
        : [];

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

export default function* rootSaga() {
  yield all([takeLeading(GET_USERS, getUsers)]);
}
