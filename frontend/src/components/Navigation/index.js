import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <span className="nav-btn">
        <NavLink className="nav-btn" to="/signup">
          Sign Up
        </NavLink>
        {"  |  "}

        <NavLink className="nav-btn" to="/login">
          Log In
        </NavLink>
        {" | "}
        <button
          onClick={async (e) => {
            const credential = "Demo-lition";
            const password = "password";
            history.push("/");
            return dispatch(sessionActions.login({ credential, password }));
          }}
          className="demo-btn"
        >
          Demo
        </button>
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
        <NavLink to="/songs">
          <i className="fa-solid fa-headphones fa-2x nav-btn"></i>
        </NavLink>
        {/* <a href="/albums">Albums</a> */}
        <NavLink to="/create">
          <i className="fa-solid fa-upload fa-2x nav-btn"></i>
        </NavLink>
        {sessionLinks}
      </nav>
    </>
  );
}

export default Navigation;
