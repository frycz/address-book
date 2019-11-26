import React from "react";
import { Link } from "react-router-dom";
import { paths } from '../../router'

const Settings: React.FC = () => (
  <div className="settings">
    <p>Settings</p>
    <Link to={paths.main}>Back to list</Link>
  </div>
);

export default Settings;
