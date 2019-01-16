import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 custom-nav">
      <NavLink to="/" className="navbar-brand book-logo">
        LOGO
      </NavLink>

      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <NavLink to="/bookshelf" className="nav-link">
            My Bookshelf
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
