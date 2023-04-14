// import GetAllSongs from "../Songs";
import { useSelector } from "react-redux";
import "./home.css";
// import { useHistory } from "react-router-dom";
const HomePage = () => {
    const user = useSelector((store) => store.session.user);
    let to;
    if (!user) to = "/login";
    else to = "/songs";
    return (
        <>
            <div className="home-container">
                {/* <img
          className="home-img"
          src="https://cdn.pixabay.com/photo/2016/03/30/05/41/music-1290087_960_720.jpg"
          alt="home page img"
        ></img> */}
                <div className="cloud">
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <i className="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                </div>
                <div className="home-text">
                    <h1>Welcome to CloudSound! </h1>
                </div>
                <a className="home-text" href={to}>
                    <i className="fa-solid fa-circle-play fa-6x  play-btn"></i>
                </a>
                <div className="home-text">
                    <h2>Discover New Music!</h2>
                </div>
                <div className="home-text">
                    <h5>Something about clouds and music</h5>
                </div>
                <div className="music">
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                    <i className="fa-solid fa-music fa-2x "></i>
                </div>
            </div>
        </>
    );
};

export default HomePage;
