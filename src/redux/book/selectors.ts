import { State } from "../store";

export const getCurrentPage = (state: State) => state.book.currentPage;

export const getLoadedPage = (state: State) => state.book.users.length;
