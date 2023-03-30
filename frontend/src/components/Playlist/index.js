import { useEffect } from "react";
import { getAllPlaylist } from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const GetPlaylists = () => {
    const playlists = useSelector((state) => Object.values(state.playlists));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPlaylist());
    }, []);

    return (
        <>
            {playlists.map((el, i) => {
                <div className="playlist-container">
                    <h1>{el.name}</h1>
                </div>;
            })}
        </>
    );
};

export default GetPlaylists;
