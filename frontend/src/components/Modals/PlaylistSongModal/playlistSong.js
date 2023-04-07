import { useEffect } from "react";
import { getAllSongs } from "../../../store/songs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const AddPlaylistSongs = () => {
    const songs = useSelector((state) => Object.values(state.songs));
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const load = async () => {
            dispatch(getAllSongs());
        };
        load();
    }, [dispatch]);

    return (
        <>
            <div className="add-playlistSong-container">
                {songs.map((el) => {
                    return <div className="playlist-song-list">{el.title}</div>;
                })}
            </div>
        </>
    );
};

export default AddPlaylistSongs;
