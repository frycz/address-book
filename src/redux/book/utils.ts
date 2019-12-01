import { Countries as CountriesConfig } from "../../config";
import { Countries as CountriesState, User } from "./types";
import { Countries as CountriesService } from "../../services/userService";

export const mapSettingsToState = (countries: CountriesConfig) => {
  const stateCountries: CountriesState = {};
  return countries.reduce((acc, country) => {
    acc[country] = true;
    return acc;
  }, stateCountries);
};

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

export const getNextPage = (
  loadedPage: number,
  currentPage: number,
  reset?: boolean
) => {
  if (reset) {
    return 1;
  }

  return currentPage <= loadedPage ? currentPage + 1 : currentPage;
};

export const mapReduxToServiceCountries = (
  countries: CountriesState
): CountriesService => {
  const serviceCountries: string[] = [];
  return Object.entries(countries).reduce((acc, [country, isSelected]) => {
    isSelected && acc.push(country);
    return acc;
  }, serviceCountries);
};

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

export const isNextLoadedPageValid = (
  nextLoadedPage: number,
  currentLoadedPage: number,
  maxPage: number
) =>
  (nextLoadedPage === 1 || nextLoadedPage === currentLoadedPage + 1) &&
  nextLoadedPage <= maxPage;
