import { State } from "../src/redux/store";
import users from "./users";
import { countriesState } from "./countries";

const state: State = {
  book: {
    users: users,
    isFetching: false,
    isError: false,
    countries: countriesState,
    currentPage: 1
  }
};

export default state;
