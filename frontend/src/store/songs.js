import { csrfFetch } from "./csrf";
const GET = "/songs/getSong";
const CREATE = "/songs/createSong";
const DELETE = "/songs/deleteSong";
const UPDATE = "/songs/updateSong";

const getSongs = (songs) => ({
  type: GET,
  songs,
});
export const updateSong = (song) => ({
  type: UPDATE,
  song,
});
export const createSong = (song) => ({
  type: CREATE,
  song,
});

export const deleteSong = (id) => ({
  type: DELETE,
  id,
});
export const getAllSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs");
  if (res.ok) {
    const data = await res.json();
    // console.log(data);
    dispatch(getSongs(data));
    return data;
  }
};

const songsReducer = (state = {}, action) => {
  let newState = { ...state };
  // console.log(action.songs);
  switch (action.type) {
    case GET:
      return { ...action.songs };
    default:
      return state;
  }
};

export default songsReducer;
