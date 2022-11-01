import { csrfFetch } from "./csrf";
const GET = "/songs/getSongs";
const ADD = "/songs/addSong";
// const DELETE = "/songs/deleteSong";
const UPDATE = "/songs/updateSong";
const GetSongById = "/songs/songId";
const getSongs = (songs) => ({
  type: GET,
  songs,
});
const editSong = (song) => ({
  type: UPDATE,
  song,
});
const addSong = (song) => ({
  type: ADD,
  song,
});

// const deleteSong = (id) => ({
//   type: DELETE,
//   id,
// });

const songId = (song) => ({
  type: GetSongById,
  song,
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

export const createSong = (song) => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  // console.log(song);
  console.log(res);
  const data = await res.json();
  console.log(data);
  dispatch(addSong(data));
  return res;
};
export const songById = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(songId(data));
  }
};

export const updateSong = (id, song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(song),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(editSong(data));
  }
};
const songsReducer = (state = {}, action) => {
  // let newState = { ...state };
  let newState = { ...state };
  console.log(action);
  // action.songs.forEach((el) => console.log(el));
  switch (action.type) {
    case GET:
      return { ...state, ...action.songs };
    case ADD:
      newState[action.songs.id] = action.songs;
      return newState;
    case UPDATE:
      newState = { ...state, [action.song.id]: action.song };
      return newState;
    case GetSongById:
      return {
        ...state,
        [action.song.id]: { ...state[action.song.id], ...action.song },
      };

    default:
      return state;
  }
};

export default songsReducer;
