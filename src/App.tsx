import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AddressBook from "./containers/AddressBook";
import "./App.scss";

const App: React.FC = () => (
  <Provider store={store}>
    <AddressBook />
  </Provider>
);

export default App;
