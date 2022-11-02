import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <span>
        <NavLink to="/signup">Sign Up</NavLink>
        {" || "}
        <NavLink to="/login">Log In</NavLink>
      </span>
    );
  }

  return (
    <>
      <nav className="navBar">
        <span className="logo">
          <NavLink className="logo" exact to="/">
            <i className="fa-brands fa-soundcloud fa-2x"></i>
            <span href="/">CloudSound</span>
          </NavLink>
        </span>
        <div className="nav-links"></div>
        {/* <a href="artists">Artists</a> */}
        <a href="/songs">Songs</a>
        {/* <a href="/albums">Albums</a> */}
        <a href="/create">Upload</a>
        {sessionLinks}
      </nav>
    </>
  );
}

export default Navigation;
