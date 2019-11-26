import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AddressBook from "../containers/AddressBook";
import Settings from "../containers/Settings";

export const paths: {[key: string]: string} = {
  main: '/',
  settings: '/settings'
}

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={paths.main}>
        <AddressBook />
      </Route>
      <Route exact path={paths.settings}>
        <Settings />
      </Route>
      <Route path="*">
        <Redirect to={paths.main} />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
