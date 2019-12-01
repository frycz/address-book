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

export const getUsers = (
  countries: GetUsersAction["countries"],
  reset?: GetUsersAction["reset"]
): GetUsersAction => ({
  type: GET_USERS,
  countries,
  reset
});

export const getUsersSuccess = (
  users: GetUsersSuccessAction["users"],
  reset?: GetUsersSuccessAction["reset"]
): GetUsersSuccessAction => ({
  type: GET_USERS_SUCCESS,
  users,
  reset
});

export const getUsersError = (): GetUsersErrorAction => ({
  type: GET_USERS_ERROR
});

export const displayPage = (reset?: DisplayPageAction['reset']): DisplayPageAction => ({
  type: DISPLAY_PAGE,
  reset,
});

export const updateSettings = (
  countries: UpdateSettingsAction["countries"]
): UpdateSettingsAction => ({
  type: UPDATE_SETTINGS,
  countries
});
