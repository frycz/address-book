import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { State, Users, User, Countries } from "../../redux/store";
import { getUsers } from "../../redux/book/actions";
import { paths } from "../../router";
import "./AddressBook.scss";

interface Props {
  users: Users;
  isFetching: boolean;
  countries: Countries;
  getUsers: typeof getUsers;
}

const AddressBook: React.FC<Props> = ({ users, isFetching, getUsers, countries }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  useEffect(() => {
    getUsers(countries);
  }, [countries]);

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

  return (
    <div className="address-book">
      <div className="address-book__top-bar">
        <p className="address-book__title">Address Book</p>
        <span className="address-book__settings-link">
          <Link to={paths.settings}>Settings</Link>
        </span>
      </div>
      <table>
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
          {users.map((user, idx) => (
            <tr key={user.email} onClick={() => handleRowClick(user)}>
              <td>{idx + 1}</td>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.login.username}</td>
              <td>{user.email}</td>
              <td>{user.location.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="address-book__message">
        {isFetching ? "Loading..." : null}
        {!isFetching && users.length === 0 ? "No users found" : null}
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
                <img src={selectedUser.picture.medium} />
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
    countries: state.book.countries,
  }),
  { getUsers }
)(AddressBook);
