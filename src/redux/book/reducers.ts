import { BookState } from '../store';
import { ActionTypes } from './actions';

import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
  } from "./actions";

  const initialState: BookState = {
    users: [],
    isFetching: false,
  };


  export default (state = initialState, action: ActionTypes): BookState => {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          isFetching: true
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          users: action.users,
          isFetching: false
        };
      case GET_USERS_ERROR:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state;
    }
  };