import { countries, Countries as CountriesSettings } from "../../config";
import { BookState, Countries, User } from "./types";
import { ActionTypes, DISPLAY_PAGE } from "./actions";

import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_SETTINGS
} from "./actions";

const mapSettingsToState = (countries: CountriesSettings) => {
  return countries.reduce((acc, country) => {
    acc[country] = true;
    return acc;
  }, {} as Countries);
};

const initialState: BookState = {
  users: [],
  isFetching: false,
  isError: false,
  countries: mapSettingsToState(countries),
  currentPage: 0
};

const appendUsersPage = (
  stateUsers: User[][],
  incomingUsers: User[],
  reset: boolean
) =>
  incomingUsers.length
    ? reset
      ? [incomingUsers]
      : [...stateUsers, incomingUsers]
    : stateUsers;

const getNextDisplayedPage = (
  loadedPage: number,
  currentDisplayedPage: number,
  reset?: boolean
) =>
  reset
    ? 1
    : currentDisplayedPage <= loadedPage
    ? currentDisplayedPage + 1
    : currentDisplayedPage;

export default (state = initialState, action: ActionTypes): BookState => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        isFetching: true,
        isError: false
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: appendUsersPage(state.users, action.users, action.reset),
        isFetching: false,
        isError: false
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case DISPLAY_PAGE:
      return {
        ...state,
        currentPage: getNextDisplayedPage(
          state.users.length,
          state.currentPage,
          action.reset
        )
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        countries: action.countries
      };
    default:
      return state;
  }
};
