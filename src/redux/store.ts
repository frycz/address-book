/**
 * Defines the {@link store} Redux store.
 * @module
 */

import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./book/reducers";
import rootSaga from "./book/sagas";
import { BookState } from "./book/types"

/**
 * Expose types from all reducers applciation.
 * Only book in this case.
 */
export * from './book/types'

const sagaMiddleware = createSagaMiddleware();

/**
 * Interface of application store
 */
export interface State {
  book: BookState;
}

/**
 * Redux store
 */
const store = createStore(
  combineReducers({
    book: reducers
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
