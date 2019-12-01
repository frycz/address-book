/**
 * Defines the {@link Settings} React component.
 * @module
 */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../redux/store";
import { paths } from "../../router";
import { Countries } from "../../redux/store";
import { updateSettings } from "../../redux/book/actions";

import "./Settings.scss";

/**
 * Props interface for {@link Settings}.
 */
export interface Props {
  initialCountries: Countries;
  updateSettings: typeof updateSettings;
}

/**
 * Main component for displaying address book
 *
 * @param {Props} props see {@link Props}
 * @returns Settings component
 */
export const Settings: React.FC<Props> = ({ initialCountries, updateSettings }) => {

  /**
   * Countries checkbox value change event handler
   * 
   * @param e - html input change event
   */
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
