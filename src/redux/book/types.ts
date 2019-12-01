import { User as ApiUser } from "../../services/userService";

export type User = ApiUser;

export interface Countries {
  [key: string]: boolean;
}

export interface BookState {
  users: User[][];
  isFetching: boolean;
  isError: boolean;
  countries: Countries;
  displayedPage: number;
}