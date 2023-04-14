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
    }
};

export const getAllPlaylist = () => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists`);
    if (res.ok) {
        const data = await res.json();
        dispatch(load(data));
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
    }
};
export const deletePlaylist = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(remove(id));
    }
};

export const editPlaylist = (playlistId, playlist) => async (dispatch) => {
    console.log(playlist);
    const res = await csrfFetch(`/api/playlists/${playlistId}/update`, {
        method: "PUT",
        body: JSON.stringify(playlist),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data));
    }
};

const playlistReducer = (state = {}, action) => {
    // console.log(action);
    let newState = { ...state };
    switch (action.type) {
        case GET:
            return { ...action.playlist };
        case CREATE:
            newState[action.playlist.id] = action.playlist;
            return newState;
        case GETID:
            return { ...newState, [action.playlist.id]: action.playlist };
        case DELETE:
            delete newState[action.id];
            return newState;
        case UPDATE:
            newState = { ...state, [action.playlist.id]: action.playlist };
            return newState;
        default:
            return state;
    }
};

export default playlistReducer;
