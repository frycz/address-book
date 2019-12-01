import { State } from "../store";

/**
 * @param state - application state
 * @returns number of currently displayed page
 */
export const getDisplayedPage = (state: State) => state.book.displayedPage;

/**
 * 
 * @param state - application state
 * @returns number of last fetched page
 */
export const getLoadedPage = (state: State) => state.book.users.length;
