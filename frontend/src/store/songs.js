import { csrfFetch } from "./csrf";
const GET = "/songs/getSong";
const CREATE = "/songs/createSong";
// const DELETE = "/songs/deleteSong";
// const UPDATE = "/songs/updateSong";
const GetSongById = "/songs/songId";
const getSongs = (songs) => ({
  type: GET,
  songs,
});
// const updateSong = (song) => ({
//   type: UPDATE,
//   song,
//});
const createSong = (song) => ({
  type: CREATE,
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

export const createASong = (song) => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    dispatch(createSong(data));
    return data;
  }
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
//
const songsReducer = (state = {}, action) => {
  // let newState = { ...state };
  let newState = { ...state };
  switch (action.type) {
    case GET:
      return { ...state, ...action.songs };
    case CREATE:
      newState[action.songs.id] = action.songs;
      return newState;

    case GetSongById:
      newState = { ...state };
      newState[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
