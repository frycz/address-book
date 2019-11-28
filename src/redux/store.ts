import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./book/reducers";
import rootSaga from "./book/sagas";
import { BookState } from "./book/types"

export * from './book/types'

const sagaMiddleware = createSagaMiddleware();

export interface State {
  book: BookState;
}

const store = createStore(
  combineReducers({
    book: reducers
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
