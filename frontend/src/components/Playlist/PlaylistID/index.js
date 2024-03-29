import { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { getPlaylistId } from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import { removePlaylistSong } from "../../../store/playlistSong";
import "react-h5-audio-player/lib/styles.css";
import PlaylistSongModal from "../../Modals/PlaylistSongModal/playlistSongModal";
import EditPlaylistModal from "../../Modals/EditPlaylistModal/editPlaylistModal";
import "./index.css";
const PlaylistDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector((store) => store.playlists[id]);
    const userId = useSelector((store) => store.session.user.id);
    const [currSong, setCurrSong] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [songImg, setSongImg] = useState();
    useEffect(() => {
        dispatch(getPlaylistId(id));
        // setSongImg(playlist?.imageUrl);
    }, [dispatch]);
    // console.log(userId);
    // console.log(playlist?.imageUrl);
    let img;
    if (!songImg) img = playlist?.imageUrl;
    else img = songImg;
    console.log(userId);
    return (
        <>
            <div className="playlist-section">
                <div className="playlist-container">
                    {userId === playlist?.userId ? (
                        <div className="playlist-user-btn">
                            <PlaylistSongModal playlistId={playlist.id} />
                            <EditPlaylistModal playlistId={playlist.id} />
                        </div>
                    ) : null}
                    <div className="playlist-title">
                        <h1>{playlist?.name}</h1>
                        <img src={img} className="playlist-songImg"></img>
                    </div>
                    {playlist?.Songs?.map((songs, i) => {
                        return (
                            <div key={i} className="song-list-item">
                                <i
                                    className="fa-solid fa-play playlist-playBtn"
                                    onClick={() => {
                                        setCurrSong(songs.url);
                                        setSongTitle(songs.title);
                                        setSongImg(songs.imageUrl);
                                    }}
                                >
                                    {songs.title}
                                </i>
                                {userId === playlist?.userId ? (
                                    <i
                                        className="fa-solid fa-minus"
                                        onClick={async () => {
                                            await dispatch(
                                                removePlaylistSong(id, songs.id)
                                            );
                                            await dispatch(getPlaylistId(id));
                                            await dispatch(getAllSongs());
                                        }}
                                    ></i>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="audio-player-container">
                <AudioPlayer src={currSong} header={songTitle} />
            </div>
        </>
    );
};

export default PlaylistDetail;
