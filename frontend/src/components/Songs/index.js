import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  // console.log(songs);
  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
  //   songs.forEach((el) => console.log(el.title));
  const data = songs.map((el) => {
    return (
      <>
        <img
          src={el.imageUrl}
          key={el.id}
          alt=""
          width="100"
          height="100"
        ></img>
        <div key={el.id} className="card">
          <a key={el.id} href={`/songs/${el.id}`}>
            {el.title}
          </a>
        </div>
      </>
    );
  });

  return <div className="song-container">{data}</div>;
};

export default GetAllSongs;
