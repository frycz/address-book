import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../redux/store";
import { paths } from "../../router";
import { Countries } from "../../redux/store";
import { updateSettings } from "../../redux/book/actions";

import "./Settings.scss";

interface Props {
  initialCountries: Countries;
  updateSettings: typeof updateSettings;
}

const Settings: React.FC<Props> = ({ initialCountries, updateSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateSettings({
      ...initialCountries,
      [name]: checked
    });
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <p className="settings__title">Settings</p>
        {Object.entries(initialCountries).map(([country, isSelected]) => (
          <div key={country}>
            <input
              id={`settings-${country}`}
              type="checkbox"
              name={country}
              checked={isSelected}
              onChange={handleChange}
            />
            <label htmlFor={`settings-${country}`}>
              {country.toUpperCase()}
            </label>
          </div>
        ))}
        <p className="settings__back-link">
          <Link to={paths.main}>Back to list</Link>
        </p>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    initialCountries: state.book.countries
  }),
  {
    updateSettings
  }
)(Settings);
