import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";

const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  console.log(songs);
  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
  songs.forEach((el) => console.log(el.title));
  const titles = songs.map((el) => {
    return <h2>{el.title}</h2>;
  });

  return <div>{titles}</div>;
};

export default GetAllSongs;
