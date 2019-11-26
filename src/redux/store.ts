import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { User as ApiUser } from '../services/userService'
import reducers from "./book/reducers";
import rootSaga from "./book/sagas";

const sagaMiddleware = createSagaMiddleware();

export type Users = ApiUser[];

export interface BookState {
    users: Users;
    isFetching: boolean;
}

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
