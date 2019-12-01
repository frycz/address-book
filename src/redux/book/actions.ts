import { User, Countries } from "./types";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const DISPLAY_PAGE = "DISPLAY_PAGE";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export interface GetUsersAction {
  type: typeof GET_USERS;
  countries: Countries;
  reset?: boolean;
}

export interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  users: User[];
  reset?: boolean;
}

export interface GetUsersErrorAction {
  type: typeof GET_USERS_ERROR;
}

export interface DisplayPageAction {
  type: typeof DISPLAY_PAGE;
  reset?: boolean;
}

export interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  countries: Countries;
}

export type ActionTypes =
  | GetUsersAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
  | DisplayPageAction
  | UpdateSettingsAction;

/**
 * Initializes fetching users page
 * 
 * @param countries - countries from which users should be fetched
 * @param reset - if `true` users are fetched from page nr `1`
 */
export const getUsers = (
  countries: GetUsersAction["countries"],
  reset?: GetUsersAction["reset"]
): GetUsersAction => ({
  type: GET_USERS,
  countries,
  reset
});

/**
 * Initializes applying fetched users to current ones
 * 
 * @param users - users fetched from api service
 * @param reset - if `true` current users will be replaced by incomming ones
 */
export const getUsersSuccess = (
  users: GetUsersSuccessAction["users"],
  reset?: GetUsersSuccessAction["reset"]
): GetUsersSuccessAction => ({
  type: GET_USERS_SUCCESS,
  users,
  reset
});

/**
 * Initializes setting error flag
 */
export const getUsersError = (): GetUsersErrorAction => ({
  type: GET_USERS_ERROR
});

/**
 * Initializes updating page number to be displayed
 * @param reset - if `true` page with nr `1` will be displayed
 */
export const displayPage = (reset?: DisplayPageAction['reset']): DisplayPageAction => ({
  type: DISPLAY_PAGE,
  reset,
});

/**
 * Initializes settings application in book Redux store
 * @param countries - countries settings to be applied
 */
export const updateSettings = (
  countries: UpdateSettingsAction["countries"]
): UpdateSettingsAction => ({
  type: UPDATE_SETTINGS,
  countries
});
