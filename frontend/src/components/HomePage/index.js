// import GetAllSongs from "../Songs";
import "./home.css";
// import { useHistory } from "react-router-dom";
const HomePage = () => {
  // const history = useHistory();
  // const btn = () => {
  //   history.push(`/songs`);
  // };
  return (
    <>
      <div className="home-container">
        <img
          className="home-img"
          src="https://cdn.pixabay.com/photo/2016/03/30/05/41/music-1290087_960_720.jpg"
          alt="home page img"
        ></img>
        <div className="home-text">
          <h1>Welcome to CloudSound! </h1>

          <a href={`/songs`}>
            <i className="fa-solid fa-circle-play fa-6x"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default HomePage;
