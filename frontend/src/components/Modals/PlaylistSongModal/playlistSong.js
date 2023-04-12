import { useEffect, useState } from "react";
import { getAllSongs } from "../../../store/songs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

const AddPlaylistSongs = () => {
    const songs = useSelector((state) => Object.values(state.songs));
    const dispatch = useDispatch();
    const history = useHistory();
    // const [songId, setSongId] = useState();
    // const [src, setSrc] = useState();
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        const load = async () => {
            dispatch(getAllSongs());
        };
        load();
    }, [dispatch]);

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
                {songs.map((el) => {
                    const isSelected = el === selectedSong;

                    return (
                        <div
                            className="playlist-song-list"
                            // onClick={() => {
                            //     setSongId(el.id);
                            //     setSrc(el.url);
                            // }}
                            onClick={() => handleSongClick(el)}
                        >
                            {/* <img
                                src={el.imageUrl}
                                className="playlistSong-img"
                            ></img> */}
                            <div className="playlistSong-item">
                                {el.title}
                                {isSelected && (
                                    <audio
                                        autoplay
                                        src={el.url}
                                        controls
                                        id="playlistSong"
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
