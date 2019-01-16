import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
//import booklogo from "./book-logo.png";
import bookbanner from "./book-logo.png";

const NavBar = props => {
  return (
    <div className="">
      {/* <div className="book-banner">
        <img src={bookbanner} alt="book-banner" />
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 custom-nav sticky">
        {/* <NavLink to="/" className="navbar-brand book-logo">
          <img className="booklogo" src={booklogo} alt="booklogo" />
        </NavLink> */}

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
    </div>
  );
};

export default NavBar;
