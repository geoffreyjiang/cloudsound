import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      dispatch(getAllSongs());
    };
    load();
  }, [dispatch]);
  console.log(songs);
  //   songs.forEach((el) => console.log(el.title));
  let data;
  if (songs) {
    data = songs.map((el) => {
      return (
        <div key={el.id} className="card" href={`/songs/${el.id}`}>
          <img
            src={el.imageUrl}
            alt="no pic avail!"
            width="100"
            height="100"
          ></img>
          <a className="song-title" href={`/songs/${el.id}`}>
            {el.title}
          </a>
        </div>
      );
    });
  }
  return <div className="wrap">{data}</div>;
};

export default GetAllSongs;
