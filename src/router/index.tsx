/**
 * Defines the {@link AppRouter} React router.
 * @module
 */

import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { batchSize, catalogueSize } from "../config";
import Loader from '../containers/Loader';

const AddressBook = React.lazy(() => import("../containers/AddressBook"));
const Settings = React.lazy(() => import("../containers/Settings"));

export const paths: { [key: string]: string } = {
  main: "/",
  settings: "/settings"
};

/**
 * Application main router.
 * Uses lazy-loading.
 */
const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <React.Suspense fallback={<Loader />}>
        <Route exact path={paths.main}>
          <AddressBook maxPage={catalogueSize / batchSize} />
        </Route>
        <Route exact path={paths.settings}>
          <Settings />
        </Route>
        <Route path="*">
          <Redirect to={paths.main} />
        </Route>
      </React.Suspense>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
