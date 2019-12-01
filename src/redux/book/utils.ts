import { Countries as CountriesConfig } from "../../config";
import { Countries as CountriesState, User } from "./types";
import { Countries as CountriesService } from "../../services/userService";

/**
 * Maps config to redux store
 * 
 * @param countries - countries configuration
 * @returns countries to be saved in redux store
 */
export const mapConfigToState = (countries: CountriesConfig) => {
  const stateCountries: CountriesState = {};
  return countries.reduce((acc, country) => {
    acc[country] = true;
    return acc;
  }, stateCountries);
};

/**
 * Appends new page to current users list.
 * If `reset` is `true` - new page replaces current list,
 * 
 * @param stateUsers - current users list
 * @param incomingUsers - new page
 * @param reset - if `true` new page replaces current list
 * @returns updated users list with new page
 */
export const appendUsersPage = (
  stateUsers: User[][],
  incomingUsers: User[],
  reset?: boolean
) => {
  if (!incomingUsers.length && !reset) {
    return stateUsers;
  }
  return reset ? [incomingUsers] : [...stateUsers, incomingUsers];
};

/**
 * Generated number of next page to be displayed based on
 * curent displayed and loaded pages.
 * 
 * @param loadedPage - number of last loaded page
 * @param displayedPage - currently displayed page
 * @param reset - if `true` returned page is `1`
 * @returns page number to be displayed
 */
export const getNextDisplayedPage = (
  loadedPage: number,
  displayedPage: number,
  reset?: boolean
) => {
  if (reset) {
    return 1;
  }

  return displayedPage <= loadedPage ? displayedPage + 1 : displayedPage;
};

/**
 * Maps countries list from Redux store to api service
 * 
 * @param countries - countries from redux store
 * @returns countries used in api service
 */
export const mapReduxToServiceCountries = (
  countries: CountriesState
): CountriesService => {
  const serviceCountries: string[] = [];
  return Object.entries(countries).reduce((acc, [country, isSelected]) => {
    isSelected && acc.push(country);
    return acc;
  }, serviceCountries);
};

/**
 * Returns number of next page to be fetched from api service
 * 
 * @param currentLoadedPage - number of last page fetched
 * @param displayedPage - number of currently displayed page
 * @param reset - if `true` next loaded page is `1`
 * @returns number of page to be fetched from api
 */
export const getNextLoadedPage = (
  currentLoadedPage: number,
  displayedPage: number,
  reset?: boolean
) => {
  if (reset) {
    return 1;
  }

  return currentLoadedPage <= displayedPage
    ? currentLoadedPage + 1
    : currentLoadedPage;
};

/**
 * Checks if number of page to be loaded does not exeed catalogue size
 * and follows current page.
 * 
 * @param nextLoadedPage 
 * @param currentLoadedPage 
 * @param maxPage - catalogue max size
 * @returns `true` if page number is valid. `false` otherwise.
 */
export const isNextLoadedPageValid = (
  nextLoadedPage: number,
  currentLoadedPage: number,
  maxPage: number
) =>
  (nextLoadedPage === 1 || nextLoadedPage === currentLoadedPage + 1) &&
  nextLoadedPage <= maxPage;
