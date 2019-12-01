import { testSaga } from "redux-saga-test-plan";
import { getUsers as getUsersService } from "../../services/userService";
import { getUsers as getUsersSaga, getCurrentPage, getLoadedPage } from "./sagas";
import { GET_USERS, getUsersSuccess, getUsersError } from "./actions";
import { Countries as CountriesRedux } from "./types";
import { Countries as CountriesService } from "../../services/userService";
import mockPage from '../../../mocks/page';

const countriesRedux: CountriesRedux = { ch: true, es: true, fr: false };
const countriesService: CountriesService = ["ch", "es"];

describe("getUser saga", () => {
  it("should load next page", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesRedux })
      .next()
      .select(getCurrentPage)
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
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesRedux })
      .next()
      .select(getCurrentPage)
      .next(1)
      .select(getLoadedPage)
      .next(2)
      .finish()
      .isDone();
  });

  it("should catch error", () => {
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesRedux })
      .next()
      .select(getCurrentPage)
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
    testSaga(getUsersSaga, { type: GET_USERS, countries: countriesRedux, reset: true })
      .next()
      .select(getCurrentPage)
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
