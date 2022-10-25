import { csrfFetch } from "./csrf";

const SET = "session/setUser";
const REMOVE = "session/removeUser";
export const setUser = (user) => {
  return {
    type: SET,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE,
  };
};
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data));
  return data;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, firstName, lastName, imageUrl } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      firstName,
      lastName,
      imageUrl,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};
const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
  let copy = { ...state };
  switch (action.type) {
    case SET:
      if (Object.keys(action.user).length) copy.user = action.user;
      return copy;
    case REMOVE:
      copy.user = null;
      return copy;
    default:
      return state;
  }
};

export default sessionReducer;
