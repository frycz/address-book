/**
 * Provides types and aliases for api data and configuration used in Redux store.
 * In components only types from Redux store should be used.
 * Components should not be aware of data structures from api services and config files.
 */

import { User as ApiUser } from "../../services/userService";

/**
 * Alias for user data used in redux store
 */
export type User = ApiUser;

/**
 * Countries interface used in redux store
 */
export interface Countries {
  [key: string]: boolean;
}

/**
 * Interface for book reducer application
 */
export interface BookState {
  users: User[][];
  isFetching: boolean;
  isError: boolean;
  countries: Countries;
  displayedPage: number;
}
