import { SagaIterator } from "redux-saga";
import { takeLatest, put, all, call } from "redux-saga/effects";
import UserService, {
  User,
  Countries as ServiceCountries
} from "../../services/userService";
import { GetUsersAction } from "./actions";
import { Countries as ReduxCountries } from "../store";
import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_ERROR } from "./actions";

const mapReduxToServiceCountries = (
  countries: ReduxCountries
): ServiceCountries =>
  Object.entries(countries).reduce((acc, [country, isSelected]) => {
    isSelected && acc.push(country);
    return acc;
  }, [] as string[]);

export function* getUsers(action: GetUsersAction): SagaIterator {
  const serviceCountries = mapReduxToServiceCountries(action.countries);
  try {
    const users: User[] = yield call(UserService.getUsers, serviceCountries);
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
  yield all([takeLatest(GET_USERS, getUsers)]);
}
