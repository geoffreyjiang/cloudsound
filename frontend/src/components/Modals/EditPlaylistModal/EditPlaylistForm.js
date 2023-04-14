import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    editPlaylist,
    deletePlaylist,
    getPlaylistId,
    getAllPlaylist,
} from "../../../store/playlists";
import "./index.css";

const EditPlaylistForm = ({ playlistId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const [name, setName] = useState(playlist.name);
    const [imageUrl, setImageUrl] = useState(playlist.imageUrl);
    // useEffect(() => {
    //     dispatch(getPlaylistId(playlistId));
    // });
    console.log(playlist);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }

        const data = {
            imageUrl,
            name,
            userId: user.id,
        };
        let newPlaylist = await dispatch(editPlaylist(playlistId, data));
        if (newPlaylist) {
            dispatch(getPlaylistId(playlistId));
            setName("");
            setImageUrl("");
        }
    };
    return (
        <>
            <div className="edit-playlist-form">
                <form method="POST" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        name="name"
                        required
                        className="playlist-name"
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label>Image Url</label>
                    <input
                        className="playlist-name"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    ></input>
                    <button className="edit-playlist-btn" type="submit">
                        Post
                    </button>
                    <button
                        className="'edit-playlist-btn"
                        onClick={async () => {
                            await dispatch(deletePlaylist(playlistId));
                            await history.push("/songs");
                        }}
                    >
                        Delete
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditPlaylistForm;
