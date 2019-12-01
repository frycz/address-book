/**
 * Defines the {@link Loader} React component.
 * @module
 */

import React from "react";

import "./Loader.scss";

/**
 * Loader displayed when lazy modules are fetched
 *
 * @returns Loader component
 */
export const Loader: React.FC = () => (
  <div className="loader-box">
    Loading...
  </div>
);

export default Loader;
