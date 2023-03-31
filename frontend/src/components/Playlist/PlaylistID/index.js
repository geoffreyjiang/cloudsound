import { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { getPlaylistId } from "../../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
const PlaylistDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector((store) => store.playlists);
    const user = useSelector((state) => state.session.user);
    useEffect(() => {
        dispatch(getPlaylistId(id));
    }, [dispatch]);
    console.log(id);

    // let songs = playlist.songs.map((el) => {
    //     return el.title;
    // });

    console.log(playlist[id].Songs);
    let songs;
    if (playlist[id].Songs) {
        songs = playlist[id].Songs.map((el) => {
            return <div>{el.title}</div>;
        });
    }
    return (
        <>
            <div className="playlist-container">
                <div className="playlist-songs">{songs}</div>
            </div>
        </>
    );
};

export default PlaylistDetail;
