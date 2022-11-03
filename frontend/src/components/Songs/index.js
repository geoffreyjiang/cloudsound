import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
import { useHistory } from "react-router-dom";
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
    data = songs.map((el) => {
      // const imgClick = () => {
      //   `/songs/${el.id}`;
      // };
      return (
        <div key={el.id} className="card" href={`/songs/${el.id}`}>
          <div className="image">
            <img
              className="card-img"
              src={el.imageUrl}
              alt="no pic avail!"
            ></img>
          </div>
          <div className="song-title">
            <a href={`/songs/${el.id}`}>{el.title}</a>
          </div>
        </div>
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
      ></button>
      <div className="song-container">
        <div className="data-container">{data}</div>
      </div>
      <button
        className="icon"
        onClick={() => {
          document.querySelector(".data-container").scrollBy(350, 0);
        }}
      ></button>
    </div>
  );
};

export default GetAllSongs;
