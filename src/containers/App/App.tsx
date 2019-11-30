import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Router from "../../router";
import "./App.scss";

export const App: React.FC = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
