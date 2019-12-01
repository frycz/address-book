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
  const stateCountries: Countries = {};
  return countries.reduce((acc, country) => {
    acc[country] = true;
    return acc;
  }, stateCountries);
};

export const initialState: BookState = {
  users: [],
  isFetching: false,
  isError: false,
  countries: mapSettingsToState(countries),
  currentPage: 0
};

const appendUsersPage = (
  stateUsers: User[][],
  incomingUsers: User[],
  reset?: boolean
) => {
  if (!incomingUsers.length && !reset) {
    return stateUsers;
  }
  return reset ? [incomingUsers] : [...stateUsers, incomingUsers];
};
const getNextPage = (
  loadedPage: number,
  currentPage: number,
  reset?: boolean
) => {
  if (reset) {
    return 1;
  }

  return currentPage <= loadedPage ? currentPage + 1 : currentPage;
};

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
        currentPage: getNextPage(
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
