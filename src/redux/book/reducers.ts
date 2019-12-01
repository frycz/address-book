import { countries } from "../../config";
import { BookState } from "./types";
import { ActionTypes, DISPLAY_PAGE } from "./actions";
import { mapSettingsToState, appendUsersPage, getNextDisplayedPage } from "./utils";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_SETTINGS
} from "./actions";

export const initialState: BookState = {
  users: [],
  isFetching: false,
  isError: false,
  countries: mapSettingsToState(countries),
  displayedPage: 0
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
        displayedPage: getNextDisplayedPage(
          state.users.length,
          state.displayedPage,
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
