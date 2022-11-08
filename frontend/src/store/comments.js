import { csrfFetch } from "./csrf";

const GET = "comments/GET";
const CREATE = "comments/CREATE";
const DELETE = "comments/DELETE";
const UPDATE = "comments/UPDATE";
const GETID = "comments/GETID";
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

const edit = (comment) => {
  return {
    type: UPDATE,
    comment,
  };
};
const commentId = (comment) => ({
  type: GETID,
  comment,
});

export const getCommentId = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(commentId(data));
    return data;
  }
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

export const editComment = (id, comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify(comment),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(edit(data));
  }
  return res;
};

const commentReducer = (state = {}, action) => {
  // console.log(action);
  let newState = { ...state };
  switch (action.type) {
    case GET:
      action.comment.forEach((el) => {
        newState[el.id] = el;
      });
      return { ...state, ...newState };
    case CREATE:
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE:
      delete newState[action.id];
      return newState;
    case UPDATE:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
