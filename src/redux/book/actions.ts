import { Users } from "../store";

export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export interface GetUsersAction {
  type: typeof GET_USERS;
  // some other params
}
export interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS;
  users: Users;
}
export interface GetUsersErrorAction {
  type: typeof GET_USERS_ERROR;
}

export type ActionTypes =
  | GetUsersAction
  | GetUsersSuccessAction
  | GetUsersErrorAction;

export const getUsers = (): GetUsersAction => ({
  type: GET_USERS
  // params
});
export const getBrandsSuccess = (
  users: GetUsersSuccessAction["users"]
): GetUsersSuccessAction => ({
  //
  type: GET_USERS_SUCCESS,
  users
});
export const getBrandsError = (): GetUsersErrorAction => ({
  //
  type: GET_USERS_ERROR
});
