const ADD = "playlist/ADD";
const DELETE = "playlist/DELETE";

// const addToPlaylist = (song) => ({
//     type: ADD,
//     song,
// });

// const removeFromPlaylist = (song) => ({
//     type: DELETE,
//     song,
// });

export const addPlaylistSong = (id) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
        const data = await res.json();
    }
};

export const removePlaylistSong = (sessionUser, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
        const data = await res.json();
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
