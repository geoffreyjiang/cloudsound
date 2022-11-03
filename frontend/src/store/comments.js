import { csrfFetch } from "./csrf";

const GET = "comments/GET";
const CREATE = "comments/CREATE";
const DELETE = "comments/DELETE";
const UPDATE = "comments/UPDATE";
const load = (comment) => {
  return {
    type: GET,
    comment,
  };
};
const create = (comment) => {
  return {
    type: CREATE,
    comment,
  };
};

const remove = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const edit = (id) => {
  return {
    type: UPDATE,
    id,
  };
};
export const getComments = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}/comments`);
  // console.log(res);
  if (res.ok) {
    const data = await res.json();
    dispatch(load(data));
    return res;
  }
};
export const createComment = (id, comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(create(data));
    return data;
  }
};
export const deleteComment = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(remove(id));
  }
};

const commentReducer = (state = {}, action) => {
  // console.log(action);
  let newState = { ...state };
  switch (action.type) {
    case GET:
      return { ...state, ...action.comment };
    case CREATE:
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE:
      delete newState[action.id];
      return newState;

    default:
      return state;
  }
};

export default commentReducer;
