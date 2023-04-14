import { useEffect, useState } from "react";
import { getAllSongs } from "../../../store/songs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";
import { addPlaylistSong } from "../../../store/playlistSong";
import { getPlaylistId } from "../../../store/playlists";
const AddPlaylistSongs = ({ playlistId }) => {
    const songs = useSelector((state) => Object.values(state.songs));
    const dispatch = useDispatch();
    const history = useHistory();
    // const [songId, setSongId] = useState();
    // const [src, setSrc] = useState();
    const playlist = useSelector((store) => store.playlists[playlistId]);

    const user = useSelector((state) => state.session.user);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        const load = async () => {
            dispatch(getAllSongs());
        };
        load();
    }, [dispatch]);
    console.log(playlistId);
    const handleSongClick = (song) => {
        if (song === selectedSong) {
            // Clicking on the same song again should deselect it
            setSelectedSong(null);
        } else {
            setSelectedSong(song);
        }
    };
    return (
        <>
            <div className="add-playlistSong-container">
                <h2>Add Songs</h2>
                {songs
                    .filter(
                        (song) =>
                            !playlist?.Songs?.some(
                                (pSong) => pSong.id === song.id
                            )
                    )
                    .map((song, i) => {
                        const isSelected = song === selectedSong;

                        return (
                            <div
                                className="playlist-song-list"
                                key={i}
                                // onClick={() => {
                                //     setSongId(el.id);
                                //     setSrc(el.url);
                                // }}
                            >
                                {/* <img
                                src={el.imageUrl}
                                className="playlistSong-img"
                            ></img> */}
                                <i
                                    className="fa-solid fa-plus"
                                    onClick={async () => {
                                        await dispatch(
                                            addPlaylistSong(playlistId, song.id)
                                        );
                                        await dispatch(
                                            getPlaylistId(playlistId)
                                        );
                                        await dispatch(getAllSongs());
                                    }}
                                ></i>
                                <div
                                    className="playlistSong-item"
                                    onClick={() => handleSongClick(song)}
                                >
                                    {song.title}
                                    {isSelected && (
                                        <audio
                                            autoPlay
                                            src={song.url}
                                            controls
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default AddPlaylistSongs;
