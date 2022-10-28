import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { songById } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => Object.values(state.songs));
  useEffect(() => dispatch(songById(id)), [id]);
  const details = song.map((el) => {
    return (
      <>
        <img src={el.imageUrl} alt="" height="100x" width="80x"></img>
        <div>Title:{el.title}</div>
        <div>Description: {el.description}</div>
        <div>Url:{el.url}</div>
      </>
    );
  });
  return (
    <>
      <div>{details}</div>
    </>
  );
};

export default SongDetail;
