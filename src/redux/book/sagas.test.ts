import { testSaga } from "redux-saga-test-plan";
import { getUsers as getUsersService } from "../../services/userService";
import { getUsers as getUsersSaga } from "./sagas";
import { getDisplayedPage, getLoadedPage } from './selectors';
import { GET_USERS, getUsersSuccess, getUsersError } from "./actions";
import { Countries as CountriesState } from "./types";
import { Countries as CountriesService } from "../../services/userService";
import mockPage from '../../../mocks/page';

const countriesState: CountriesState = { ch: true, es: true, fr: false };
const countriesService: CountriesService = ["ch", "es"];

describe("getUser saga", () => {
  it("should load next page", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesState })
      .next()
      .select(getDisplayedPage)
      .next(1)
      .select(getLoadedPage)
      .next(1)
      .call(getUsersService, countriesService, 2)
      .next(mockPage)
      .put(getUsersSuccess(mockPage))
      .finish()
      .isDone();
  });

  it("should not load next page", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesState })
      .next()
      .select(getDisplayedPage)
      .next(1)
      .select(getLoadedPage)
      .next(2)
      .put(getUsersSuccess([]))
      .next()
      .finish()
      .isDone();
  });

  it("should catch error", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesState })
      .next()
      .select(getDisplayedPage)
      .next(1)
      .select(getLoadedPage)
      .next(1)
      .call(getUsersService, countriesService, 2)
      .throw(new Error())
      .put(getUsersError())
      .finish()
      .isDone();
  });

  it("should reset pages", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesState, reset: true })
      .next()
      .select(getDisplayedPage)
      .next(3)
      .select(getLoadedPage)
      .next(3)
      .put(getUsersSuccess([], true))
      .next()
      .call(getUsersService, countriesService, 1)
      .next(mockPage)
      .put(getUsersSuccess(mockPage, true))
      .finish()
      .isDone();
  });
});
