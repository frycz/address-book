import { countries, Countries as CountriesSettings } from '../../config';
import { BookState, Countries } from '../store';
import { ActionTypes } from './actions';

import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    UPDATE_SETTINGS,
  } from "./actions";

  const mapSettingsToState = (countries: CountriesSettings) => {
    return countries.reduce((acc, country) => {
      acc[country] = true;
      return acc;
    }, {} as Countries)
  }

  const initialState: BookState = {
    users: [],
    isFetching: false,
    countries: mapSettingsToState(countries),
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
        case UPDATE_SETTINGS:
        return {
          ...state,
          countries: action.countries
        };
      default:
        return state;
    }
  };