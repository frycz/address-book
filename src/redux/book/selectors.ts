import { State } from "../store";

export const getDisplayedPage = (state: State) => state.book.displayedPage;

export const getLoadedPage = (state: State) => state.book.users.length;
