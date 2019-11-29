import { countries, Countries as CountriesSettings } from "../../config";
import { BookState, Countries } from "./types";
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
        users: action.users.length
          ? action.page === 1
            ? [action.users]
            : [...state.users, action.users]
          : state.users,
        isFetching: false,
        isError: false
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case DISPLAY_PAGE: {
      const currentPage = action.page
        ? action.page
        : state.currentPage <= state.users.length
        ? state.currentPage + 1
        : state.currentPage;

      console.log("display next page:", currentPage);
      return {
        ...state,
        currentPage
      };
    }
    case UPDATE_SETTINGS:
      return {
        ...state,
        countries: action.countries
      };
    default:
      return state;
  }
};
