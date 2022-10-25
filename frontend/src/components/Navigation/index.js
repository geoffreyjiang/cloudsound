import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="nav-link">
          Log In
        </NavLink>
        {"  "} {"  "}
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li className="nav-list">
          <NavLink className="nav-link" exact to="/">
            <i class="fa-brands fa-soundcloud fa-2x"></i>
            CloudSound
          </NavLink>
        </li>
        <li className="nav-link">Songs</li>
        <li className="nav-link">Albums</li>
        <li className="nav-link">Upload</li>
        <li className="nav-link">{sessionLinks}</li>
      </ul>
    </nav>
  );
}

export default Navigation;
