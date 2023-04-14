import { csrfFetch } from "./csrf";

const ADD = "playlist/ADD";
const DELETE = "playlist/DELETE";

const addToPlaylist = (song) => ({
    type: ADD,
    song,
});

const removeFromPlaylist = (song) => ({
    type: DELETE,
    song,
});

export const addPlaylistSong = (playlistId, songId) => async (dispatch) => {
    // console.log(playlistId);
    const res = await csrfFetch(`/api/playlists/${playlistId}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId, playlistId }),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(addToPlaylist(data));
    }
};

export const removePlaylistSong = (playlistId, songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId, playlistId }),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeFromPlaylist(data));
    }
};

const playlistSongReducer = (state = {}, action) => {
    const newState = { ...state };

    switch (action.type) {
        case ADD:
            newState[action.song] = action.song;
            return newState;
        case DELETE:
            delete newState[action.song];
            return newState;

        default:
            return state;
    }
};

export default playlistSongReducer;
