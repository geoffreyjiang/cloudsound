import { csrfFetch } from "./csrf";
// const GET = "/songs/getSongs";
const ADD = "/songs/addSong";
// const DELETE = "/songs/deleteSong";
const UPDATE = "/songs/updateSong";
const GetSongById = "/songs/songId";
const LOAD = "/songs/load";
// const getSongs = (song) => ({
//   type: GET,
//   song,
// });
const editSong = (song) => ({
  type: UPDATE,
  song,
});
const loadSongs = (songs) => ({
  type: LOAD,
  songs,
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

export const createSong = (song) => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addSong(data));
    return data;
  }
};
export const songById = (id) => async (dispatch) => {
  // console.log(id, "SONGBYID");
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: "GET",
  });

  // console.log(res, "SONGBYID");
  if (res.ok) {
    const data = await res.json();
    dispatch(songId(data));
    return data;
  }
};

export const updateSong = (id, song) => async (dispatch) => {
  // console.log(id, "updateID");
  // console.log(song, "updateSong");
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: "PUT",
    body: JSON.stringify(song),
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(editSong(data));
  }
  return res;
};

export const getAllSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs");
  // console.log(res);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSongs(data));
    return data;
  }
};

const songsReducer = (state = {}, action) => {
  let newState = { ...state };
  // console.log(action.song);
  // action.songs.forEach((el) => console.log(el));
  switch (action.type) {
    // case GET:
    //   // return { ...action.songs };
    //   return { ...state, ...action.song };

    case LOAD:
      // const n = { ...state };
      action.songs.forEach((el) => {
        newState[el.id] = el;
      });
      return {
        ...state,
        ...newState,
      };
    case ADD:
      newState[action.song.id] = action.song;
      console.log(newState);
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
