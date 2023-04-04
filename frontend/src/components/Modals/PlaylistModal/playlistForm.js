import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createPlaylist, getAllPlaylist } from "../../../store/playlists";

const PlaylistForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const [name, setName] = useState();
    const [imageUrl, setImageUrl] = useState();

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
        let newPlaylist = dispatch(createPlaylist(data));
        if (newPlaylist) {
            dispatch(getAllPlaylist());
            setName("");
            setImageUrl("");
        }
    };
    return (
        <>
            <div className="create-playlist-form">
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
                    <button className="editTweet-btn" type="submit">
                        Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default PlaylistForm;
