import { useEffect } from "react";
import { getAllPlaylist } from "../../store/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const GetPlaylists = () => {
    const playlists = useSelector((state) => Object.values(state.playlists));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPlaylist());
    }, []);
    let data;
    if (playlists) {
        data = playlists?.map((el, i) => {
            return (
                <div key={el.id} className="card">
                    <div key={i} className="image">
                        <img
                            className="card-img"
                            src={el?.imageUrl}
                            alt="no pic avail!"
                        ></img>
                        <div className="song-title">
                            <Link to={`/playlists/${el.id}`}>
                                <i className="fa-solid fa-play fa-2x song-btn "></i>
                                <br></br>
                                {el.name}
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    }
    return (
        <>
            <div className="browse-text">
                <h2>Browse Playlists</h2>
            </div>
            <div className="wrapper">
                <button
                    className="icon"
                    onClick={() => {
                        document
                            .querySelector(".data-container")
                            .scrollBy(-350, 0);
                    }}
                >
                    <i className="fa-solid fa-angles-left fa-3x arrows" fa></i>
                </button>
                <div className="song-container">
                    <div className="data-container">{data}</div>;
                </div>
                <button
                    className="icon"
                    onClick={() => {
                        document
                            .querySelector(".data-container")
                            .scrollBy(350, 0);
                    }}
                >
                    <i className="fa-solid fa-angles-right fa-3x arrows" fa></i>
                </button>
            </div>
        </>
    );
};

export default GetPlaylists;
