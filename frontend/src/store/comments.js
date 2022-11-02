import { csrfFetch } from "./csrf";

const GET = "songs/GET";
const CREATE = "songs/CREATE";
// const DELETE = "songs/DELETE";

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

const commentReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case GET:
      return { ...state, ...action.comment };
    case CREATE:
      let newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    default:
      return state;
  }
};

export default commentReducer;
