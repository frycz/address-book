import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { State, Users } from "../../redux/store";
import { getUsers } from "../../redux/book/actions";
import { paths } from "../../router";
import "./AddressBook.scss";

interface Props {
  users: Users;
  getUsers: typeof getUsers;
}

const AddressBook: React.FC<Props> = ({ users, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.login.username}>
              <td>{idx + 1}</td>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.login.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(
  (state: State) => ({
    users: state.book.users
  }),
  { getUsers }
)(AddressBook);
