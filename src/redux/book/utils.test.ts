import {
  mapSettingsToState,
  appendUsersPage,
  getNextPage,
  mapReduxToServiceCountries,
  getNextLoadedPage,
  isNextLoadedPageValid
} from "./utils";
import users from "../../../mocks/users";
import page from "../../../mocks/page";
import {
  countriesConfig,
  countriesStateInit,
  countriesState,
  countriesService
} from "../../../mocks/countries";

describe("Redux utils", () => {
  it("should map config countries to state countries", () => {
    expect(mapSettingsToState(countriesConfig)).toEqual(countriesStateInit);
  });

  it("should append page to users", () => {
    expect(appendUsersPage(users, page)).toEqual([...users, page]);
  });

  it("should reset users to page", () => {
    expect(appendUsersPage(users, page, true)).toEqual([page]);
  });

  it("should increment next page when pages are qual", () => {
    expect(getNextPage(3, 3)).toEqual(4);
  });

  it("should increment next page when there is more loaded pages", () => {
    expect(getNextPage(4, 3)).toEqual(4);
  });

  it("should not increment next page", () => {
    expect(getNextPage(3, 4)).toEqual(4);
  });

  it("should reset page to 1", () => {
    expect(getNextPage(3, 4, true)).toEqual(1);
  });

  it("should map state countries to api service countries", () => {
    expect(mapReduxToServiceCountries(countriesState)).toEqual(countriesService);
  });

  it("should increment loaded page when pages are equal", () => {
    expect(getNextLoadedPage(3,3)).toEqual(4);
  });

  it("should increment loaded page when more pages are displayed", () => {
    expect(getNextLoadedPage(2,3)).toEqual(3);
  });

  it("should not increment loaded page", () => {
    expect(getNextLoadedPage(4,3)).toEqual(4);
  });

  it("should reset page to 1", () => {
    expect(getNextLoadedPage(4,3, true)).toEqual(1);
  });

  it("should be valid", () => {
    expect(isNextLoadedPageValid(6,5,10)).toEqual(true);
    expect(isNextLoadedPageValid(1,5,10)).toEqual(true);
  });

  it("should be invalid", () => {
    expect(isNextLoadedPageValid(4,2,10)).toEqual(false);
    expect(isNextLoadedPageValid(3,4,10)).toEqual(false);
    expect(isNextLoadedPageValid(4,4,10)).toEqual(false);
    expect(isNextLoadedPageValid(11,10,10)).toEqual(false);
  });
});
