/**
 * Defines the {@link AddressBook} React component.
 * @module
 */

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { State, User, Countries } from "../../redux/store";
import { getUsers, displayPage } from "../../redux/book/actions";
import { paths } from "../../router";
import "./AddressBook.scss";

/**
 * Props interface for {@link AddressBook}.
 */
export interface Props {
  users: User[][];
  maxPage: number;
  isFetching: boolean;
  isError: boolean;
  countries: Countries;
  displayedPage: number;
  getUsers: typeof getUsers;
  displayPage: typeof displayPage;
}

/**
 * Main component for displaying address book
 *
 * @param {Props} props see {@link Props}
 * @returns AddressBook component
 */
export const AddressBook: React.FC<Props> = ({
  users,
  maxPage,
  isFetching,
  isError,
  getUsers,
  displayedPage,
  displayPage,
  countries
}: Props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    refresh();
  }, [countries]);

  useEffect(() => {
    getUsers(countries);
  }, [users]);

  useBottomScrollListener(() => {
    if (!isError && !filter) {
      displayPage();
      getUsers(countries);
    }
  }, 400);

  /**
   * Fetches the catalogue from the first page
   */
  function refresh() {
    setFilter("");
    displayPage(true);
    getUsers(countries, true);
  }

  /**
   * Openes user details modal
   */
  function openModal() {
    setIsOpen(true);
  }

  /**
   * Closes user details modal
   */
  function closeModal() {
    setIsOpen(false);
  }

  /**
   * Catalogue row click event handler
   * 
   * @param user - user data from application state
   */
  function handleRowClick(user: User) {
    setSelectedUser(user);
    openModal();
  }

  /**
   * Search field value change event handler
   * 
   * @param e - html input change event
   */
  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  /**
   * Filters users list based on user first and last name
   * 
   * @param user - user data from application state
   * @returns filtered users list
   */
  const filterUsers = (user: User) => {
    return (
      `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`.indexOf(
        filter.toLowerCase()
      ) === 0
    );
  };

  /**
   * @returns catalogue information message
   */
  function displayMessage(): string | undefined {
    if (isError) {
      return "Catalogue unavailable";
    }

    if (!isFetching && displayedPage >= maxPage) {
      return "End of user catalogue";
    }

    if (!isFetching && users.length === 0 && displayedPage > 0) {
      return "No users found";
    }

    if (
      !filter &&
      !isError &&
      displayedPage < maxPage &&
      (users.length !== 0 || isFetching)
    ) {
      return "Loading...";
    }
  }

  return (
    <div className="address-book">
      <div className="address-book__header">
        <div className="address-book__top-bar">
          <span>Address Book</span>
          <input
            className="address-book__search"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search..."
          />
          <span className="address-book__settings-link">
            <Link to={paths.settings}>Settings</Link>
          </span>
        </div>
      </div>
      <div className="address-book__list">
        {users.length ? (
          <table className="address-book__table">
            <thead>
              <tr>
                <th>#</th>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice(0, Math.min(displayedPage, maxPage))
                .reduce((list, page) => list.concat(page), [])
                .filter(filterUsers)
                .map((user, idx) => (
                  <tr key={user.email} onClick={() => handleRowClick(user)}>
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={user.picture.thumbnail}
                        width={48}
                        height={48}
                      />
                    </td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.login.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
      </div>
      <div className="address-book__message">
        {displayMessage()}
        {isError ? (
          <div>
            <button onClick={refresh}>{"Refresh"}</button>
          </div>
        ) : null}
      </div>
      <Modal
        className="address-book__details-modal"
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {selectedUser && (
          <>
            <p>{"User Details"}</p>
            <div className="address-book__details-container">
              <div>
                <img
                  src={selectedUser.picture.large}
                  width={128}
                  height={128}
                />
              </div>
              <div>
                {`${selectedUser.name.first} ${selectedUser.name.last}`}
                <div>{`${selectedUser.location.street.name} ${selectedUser.location.street.number}`}</div>
                <div>{`${selectedUser.location.city}, ${selectedUser.location.state}`}</div>
                <div>{selectedUser.location.postcode}</div>
                <div>{`pho.: ${selectedUser.phone}`}</div>
                <div>{`cell: ${selectedUser.cell}`}</div>
              </div>
            </div>

            <div className="address-book__details-close">
              <button onClick={closeModal}>close</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default connect(
  (state: State) => ({
    users: state.book.users,
    isFetching: state.book.isFetching,
    isError: state.book.isError,
    countries: state.book.countries,
    displayedPage: state.book.displayedPage
  }),
  { getUsers, displayPage }
)(AddressBook);
