import React from "react";

import "./Loader.scss";

/**
 * Loader displayed when lazy modules are fetched
 */
export const Loader: React.FC = () => (
  <div className="loader-box">
    Loading...
  </div>
);

export default Loader;
