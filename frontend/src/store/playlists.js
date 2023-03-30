import { csrfFetch } from "./csrf";

const GET = "playlists/GET";
const CREATE = "playlists/CREATE";
const DELETE = "playlists/DELETE";
const UPDATE = "playlists/UPDATE";
const GETID = "playlists/GETID";
const load = (playlist) => {
    return {
        type: GET,
        playlist,
    };
};
const create = (playlist) => {
    return {
        type: CREATE,
        playlist,
    };
};

const edit = (playlist) => {
    return {
        type: UPDATE,
        playlist,
    };
};
const remove = (id) => {
    return {
        type: DELETE,
        id,
    };
};

const playlistId = (playlist) => ({
    type: GETID,
    playlist,
});

export const getPlaylistId = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(playlistId(data));
        return data;
    }
};

export const getAllPlaylist = () => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists`);
    if (res.ok) {
        const data = await res.json();
        dispatch(load(data));
        return res;
    }
};
export const createPlaylist = (playlist) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlist),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data));
        return data;
    }
};
// export const deleteComment = (id) => async (dispatch) => {
//     const res = await csrfFetch(`/api/comments/${id}`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         dispatch(remove(id));
//     }
// };

// export const editComment = (id, comment) => async (dispatch) => {
//     const res = await csrfFetch(`/api/comments/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(comment),
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(edit(data));
//     }
//     return res;
// };

const playlistReducer = (state = {}, action) => {
    // console.log(action);
    let newState = { ...state };
    switch (action.type) {
        case GET:
            return { ...newState, ...action.playlist };
        case CREATE:
            newState[action.playlist.id] = action.playlist;
            return newState;
        case GETID:
            return {
                [action.playlist.id]: {
                    ...state[action.playlist.id],
                    ...action.playlist,
                },
            };
        default:
            return state;
    }
};

export default playlistReducer;
