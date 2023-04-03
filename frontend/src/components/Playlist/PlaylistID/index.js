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
    const playlist = useSelector((store) => Object.values(store.playlists));
    const user = useSelector((state) => state.session.user);
    const [currSong, setCurrSong] = useState("");
    const [songTitle, setSongTitle] = useState("");
    useEffect(() => {
        dispatch(getPlaylistId(id));
    }, [dispatch]);
    console.log(playlist.name);

    return (
        <>
            <div className="playlist-section">
                <div className="playlist-container">
                    {playlist?.map((el) => {
                        // console.log(el);
                        // console.log(el.Songs);

                        return (
                            <>
                                <div className="playlist-title">
                                    <h1>{el?.name}</h1>
                                </div>
                                <div className="playlist-songs">
                                    {el?.Songs?.map((songs) => {
                                        return (
                                            <ul>
                                                <div className="song-list-item">
                                                    <i
                                                        className="fa-solid fa-play playlist-playBtn"
                                                        onClick={() => {
                                                            setCurrSong(
                                                                songs.url
                                                            );
                                                            setSongTitle(
                                                                songs.title
                                                            );
                                                        }}
                                                    ></i>
                                                    <li>{songs.title}</li>
                                                </div>
                                            </ul>
                                        );
                                    })}
                                </div>
                            </>
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
