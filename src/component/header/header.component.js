import React from "react";
import "./header.styles.css";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header">
        <ul className="options">
          <li>HOME</li>
          <li>CONTACT</li>
        </ul>
        <span>
          Hi, Admin
          <ul className="dropdown">
            <li className="dropdown-item">Setting</li>
            <li className="dropdown-item">Signout</li>
          </ul>
        </span>
        <img
          className="avatar"
          src="https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
        />
      </div>
    );
  }
}
export default Header;
