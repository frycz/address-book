import { Users, Countries } from "../store";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export interface GetUsersAction {
  type: typeof GET_USERS;
  countries: Countries;
}

export interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  users: Users;
}

export interface GetUsersErrorAction {
  type: typeof GET_USERS_ERROR;
}

export interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  countries: Countries;
}

export type ActionTypes =
  | GetUsersAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
  | UpdateSettingsAction;

export const getUsers = (countries: GetUsersAction["countries"]): GetUsersAction => ({
  type: GET_USERS,
  countries
});

export const getUsersSuccess = (
  users: GetUsersSuccessAction["users"]
): GetUsersSuccessAction => ({
  type: GET_USERS_SUCCESS,
  users
});

export const getUsersError = (): GetUsersErrorAction => ({
  type: GET_USERS_ERROR
});

export const updateSettings = (
  countries: UpdateSettingsAction["countries"]
): UpdateSettingsAction => ({
  type: UPDATE_SETTINGS,
  countries
});
