import { User, Countries } from "./types";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export interface GetUsersAction {
  type: typeof GET_USERS;
  countries: Countries;
  page?: number;
}

export interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  users: User[];
  page: number;
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

export const getUsers = (
  countries: GetUsersAction["countries"],
  page?: GetUsersAction["page"]
): GetUsersAction => ({
  type: GET_USERS,
  countries,
  page
});

export const getUsersSuccess = (
  users: GetUsersSuccessAction["users"],
  page: GetUsersSuccessAction["page"]
): GetUsersSuccessAction => ({
  type: GET_USERS_SUCCESS,
  users,
  page
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
