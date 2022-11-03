import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
import { Link, useHistory } from "react-router-dom";
const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const load = async () => {
      dispatch(getAllSongs());
    };
    load();
  }, [dispatch]);
  // console.log(songs);
  //   songs.forEach((el) => console.log(el.title));
  let data;
  if (songs) {
    data = songs.map((el, i) => {
      let { id } = el;
      return (
        <>
          <div key={el.id} className="card">
            <div key={i} className="image">
              <img
                className="card-img"
                src={el.imageUrl}
                alt="no pic avail!"
                onClick={() => {
                  history.push(`/songs/${id}`);
                }}
              ></img>
              <div className="song-title">
                <a href={`/songs/${id}`}>{el.title}</a>
              </div>
            </div>
          </div>
        </>
      );
    });
  }
  return (
    <div className="wrapper">
      <button
        className="icon"
        onClick={() => {
          document.querySelector(".data-container").scrollBy(-350, 0);
        }}
      >
        <i className="fa-solid fa-angles-left fa-3x" fa></i>
      </button>
      <div className="song-container">
        <div className="data-container">{data}</div>
      </div>
      <button
        className="icon"
        onClick={() => {
          document.querySelector(".data-container").scrollBy(350, 0);
        }}
      >
        <i className="fa-solid fa-angles-right fa-3x" fa></i>
      </button>
    </div>
  );
};

export default GetAllSongs;
