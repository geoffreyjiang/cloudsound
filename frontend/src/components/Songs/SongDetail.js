import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { songById, getAllSongs } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state);

  const song = useSelector((state) => Object.values(state.songs));
  useEffect(() => {
    const load = async () => {
      dispatch(songById(id));
      //   dispatch(getAllSongs());
    };
    load();
  }, [dispatch, id]);
  console.log(songs);
  const details = song.map((el) => {
    return (
      <>
        <div className="song-card">
          <img src={el.imageUrl} alt="" height="100x" width="80x"></img>
          <div>Title:{el.title}</div>
          <div>Description: {el.description}</div>
          {/* <div>Url:{el.url}</div> */}
          <audio
            controls
            src="https://cloudsound-audio.s3.us-west-1.amazonaws.com/09+Nights.mp3"
          >
            <a href="https://cloudsound-audio.s3.us-west-1.amazonaws.com/09+Nights.mp3"></a>
          </audio>
          <Link to={`/songs/${el.id}/edit`}>Edit</Link>
        </div>
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
