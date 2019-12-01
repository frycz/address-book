import reducer, { initialState } from "./reducers";
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DISPLAY_PAGE,
  UPDATE_SETTINGS
} from "./actions";
import { Countries, User } from "./types";
// TODO: use objects instead of json
import mockUsers from "../../../mocks/users.json";
import mockPage from "../../../mocks/page.json";

const countries: Countries = { ch: true, es: true, fr: false };

describe("Address book reducer", () => {
  it("should return initialstate", () => {
    // @ts-ignore
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  it("should respond to GET_USERS action", () => {
    const state = reducer(undefined, { type: GET_USERS, countries: {} });
    expect(state).toEqual({
      ...initialState,
      isFetching: true,
      isError: false
    });
  });

  it("should respond to GET_USERS_SUCCESS action", () => {
    const state = reducer(
      { ...initialState, users: mockUsers as User[][] },
      { type: GET_USERS_SUCCESS, users: mockPage, reset: false }
    );
    expect(state).toEqual({
      ...initialState,
      users: [...mockUsers, mockPage],
      isFetching: false,
      isError: false
    });
  });

  it("should respond to GET_USERS_SUCCESS action with reset", () => {
    const state = reducer(
      { ...initialState, users: mockUsers as User[][] },
      { type: GET_USERS_SUCCESS, users: mockPage, reset: true }
    );
    expect(state).toEqual({
      ...initialState,
      users: [mockPage],
      isFetching: false,
      isError: false
    });
  });

  it("should respond to GET_USERS_ERROR action", () => {
    const state = reducer(undefined, { type: GET_USERS_ERROR });
    expect(state).toEqual({
      ...initialState,
      isFetching: false,
      isError: true
    });
  });

  it("should respond to DISPLAY_PAGE action", () => {
    const state = reducer(
      { ...initialState, users: mockUsers as User[][], currentPage: 2 },
      { type: DISPLAY_PAGE }
    );
    expect(state).toEqual({
      ...initialState,
      users: mockUsers,
      currentPage: 3
    });
  });

  it("should respond to DISPLAY_PAGE action with reset", () => {
    const state = reducer(
      { ...initialState, users: mockUsers as User[][], currentPage: 2 },
      { type: DISPLAY_PAGE, reset: true }
    );
    expect(state).toEqual({
      ...initialState,
      users: mockUsers,
      currentPage: 1
    });
  });

  it("should respond to DISPLAY_PAGE action exceeding loaded pages", () => {
    const state = reducer(
      { ...initialState, users: mockUsers as User[][], currentPage: 4 },
      { type: DISPLAY_PAGE }
    );
    expect(state).toEqual({
      ...initialState,
      users: mockUsers,
      currentPage: 4
    });
  });

  it("should respond to UPDATE_SETTINGS action", () => {
    const state = reducer(undefined, { type: UPDATE_SETTINGS, countries });
    expect(state).toEqual({ ...initialState, countries });
  });
});
