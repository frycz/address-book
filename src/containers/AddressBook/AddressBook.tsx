import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { State, User, Countries } from "../../redux/store";
import { getUsers, displayPage } from "../../redux/book/actions";
import { paths } from "../../router";
import "./AddressBook.scss";

interface Props {
  users: User[][];
  maxPage: number;
  isFetching: boolean;
  isError: boolean;
  countries: Countries;
  currentPage: number;
  getUsers: typeof getUsers;
  displayPage: typeof displayPage;
}

const AddressBook: React.FC<Props> = ({
  users,
  maxPage,
  isFetching,
  isError,
  getUsers,
  currentPage,
  displayPage,
  countries
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    displayPage(1);
    getUsers(countries, 1);
  }, [countries]);

  useEffect(() => {
    getUsers(countries);
  }, [users]);

  useBottomScrollListener(() => {
    if (!filter) {
      displayPage();
      getUsers(countries);
    }
  }, 400);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleRowClick(user: User) {
    setSelectedUser(user);
    openModal();
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  const filterUsers = (user: User) =>
    user.name.first.toLowerCase().indexOf(filter.toLowerCase()) === 0;

    function displayMessage() {
      if (isError) {
        return "Catalogue unavailable";
      }

      if (!isFetching && currentPage >= maxPage) {
        return "End of user catalogue";
      }

      if (!isFetching && users.length === 0 && currentPage > 0) {
        return "No users found";
      }
      // TODO: check this condition
      if (!filter && !isError && currentPage < maxPage && (users.length !== 0 || isFetching)) {
        return "Loading...";
      }
    }
    
  return (
    <div className="address-book">
      <div className="address-book__header">
        <div className="address-book__top-bar">
          <span>Address Book</span>
          <input className="address-book__search" value={filter} onChange={handleFilterChange} placeholder="Search..." />
          <span className="address-book__settings-link">
            <Link to={paths.settings}>Settings</Link>
          </span>
        </div>
      </div>
      <div className="address-book__list">
        {users.length ? (<table className="address-book__table">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>!!!TMP</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(0, currentPage)
              .reduce((list, page) => list.concat(page), [])
              .filter(filterUsers)
              .map((user, idx) => (
                <tr key={user.email} onClick={() => handleRowClick(user)}>
                  <td>{idx + 1}</td>
                  <td>
                    <img src={user.picture.thumbnail} width={48} height={48} />
                  </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.login.username}</td>
                  <td>{user.email}</td>
                  <td>{user.location.country}</td>
                </tr>
              ))}
          </tbody>
        </table>) : null}
      </div>
      <div className="address-book__message">
        {displayMessage()}
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
                <div>{selectedUser.location.city}</div>
                <div>{selectedUser.location.state}</div>
                <div>{selectedUser.location.postcode}</div>
                <div>{selectedUser.phone}</div>
                <div>{selectedUser.cell}</div>
              </div>
            </div>

            <div>
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
    currentPage: state.book.currentPage
  }),
  { getUsers, displayPage }
)(AddressBook);
