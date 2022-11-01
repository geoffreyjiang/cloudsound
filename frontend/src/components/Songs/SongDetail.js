import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { songById } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../store/comments";
import CreateComment from "../Comments";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state);
  // console.log(id);
  const song = useSelector((state) => Object.values(state.songs));
  const comments = useSelector((state) => Object.values(state.comments));
  // console.log(comments);
  // comments.forEach((el) => console.log(el));
  let allComments;
  if (comments) {
    allComments = comments.map((el) => {
      return (
        <div className="comments-section">
          <div>{el.body}</div>
          <div>By: {el.userId}</div>
        </div>
      );
      // console.log(el);
    });
  }
  useEffect(() => {
    const load = async () => {
      dispatch(songById(id));
      //   dispatch(getAllSongs());
      dispatch(getComments(id));
    };
    load();
  }, [id, dispatch]);
  const details = song.map((el, i) => {
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
            <a href="https://cloudsound-audio.s3.us-west-1.amazonaws.com/09+Nights.mp3">
              Link
            </a>
          </audio>
          <Link to={`/songs/${el.id}/edit`}>Edit</Link>
        </div>
      </>
    );
  });
  return (
    <>
      <div key={id}>{details}</div>
      <br></br>
      <br></br>
      <br></br>
      <section>
        <h1 className="comments-section">Comments</h1>
        {allComments}
      </section>
      <CreateComment />
    </>
  );
};

export default SongDetail;
