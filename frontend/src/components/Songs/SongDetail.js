import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { songById, removeSong } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../store/comments";
import CreateComment from "../Comments";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state);
  // console.log(id);
  const history = useHistory();
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
  const deleteBtn = () => {
    dispatch(removeSong(id));
    history.push(`/songs/`);
  };
  useEffect(() => {
    const load = async () => {
      dispatch(songById(id));
      //   dispatch(getAllSongs());
      dispatch(getComments(id));
    };
    load();
  }, [id, dispatch]);
  const details = song.map((el, i) => {
    console.log(el);

    let uploadedBy;
    if (!el.Artist) {
      uploadedBy = "test";
    } else {
      uploadedBy = el.Artist.username;
    }
    return (
      <>
        {/* console.log(el.Art; */}
        <div className="song-card">
          <img src={el.imageUrl} alt="" height="100x" width="80x"></img>
          <h1>Title:{el.title}</h1>
          <h2>Upload By: {uploadedBy}</h2>
          <h3>Description: {el.description}</h3>
          {/* <div>Url:{el.url}</div> */}
          <audio controls src={el.url}>
            <a href={el.url}>Link</a>
          </audio>
          <Link to={`/songs/${el.id}/edit`}>Edit</Link>
          <button onClick={deleteBtn}>Delete</button>
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
