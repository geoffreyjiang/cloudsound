import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
  console.log(songs);
  //   songs.forEach((el) => console.log(el.title));
  const data = songs.map((el) => {
    return (
      <div key={el.id} className="card">
        <img src={el.imageUrl} alt="" width="100" height="100"></img>
        <br></br>
        <a className="song-title" href={`/songs/${el.id}`}>
          {el.title}
        </a>
        {/* <div>{el.id}</div> */}
        <br></br>
      </div>
    );
  });

  return <div className="song-container">{data}</div>;
};

export default GetAllSongs;
