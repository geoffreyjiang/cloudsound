import { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { getPlaylistId, getAllPlaylist } from "../../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import "./index.css";
const PlaylistDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector((store) => store.playlists[id]);
    const [currSong, setCurrSong] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [songImg, setSongImg] = useState();
    useEffect(() => {
        dispatch(getPlaylistId(id));
        setSongImg(playlist?.imageUrl);
    }, [dispatch, songImg]);
    console.log(songImg);
    console.log(playlist.imageUrl);
    return (
        <>
            <div className="playlist-section">
                <div className="playlist-container">
                    <div className="playlist-title">
                        <h1>{playlist?.name}</h1>
                        <img
                            src={playlist?.imageUrl}
                            className="playlist-songImg"
                        ></img>
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
