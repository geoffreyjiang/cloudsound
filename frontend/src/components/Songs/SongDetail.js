import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { songById, removeSong } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
import { getComments, deleteComment } from "../../store/comments";
import CreateComment from "../Comments";
import "./songDetail.css";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const songs = useSelector((state) => state);
  // console.log(id);
  const user = useSelector((state) => state.session.user);

  const history = useHistory();
  const song = useSelector((state) => Object.values(state.songs));
  const comments = useSelector((state) => Object.values(state.comments));
  // console.log(comments);
  // comments.forEach((el) => console.log(el));

  let commentId;
  let allComments;

  let userId;

  const deleteCommentBtn = () => {
    dispatch(deleteComment(commentId));
    // window.location.reload();
  };
  if (comments) {
    allComments = comments.map((el) => {
      let y;
      commentId = el.id;
      !el.User ? (y = "admin") : (y = el.User.username);
      return (
        <div className="comments-section">
          <div>{el.body}</div>
          <div>By: {y}</div>
          <button onClick={deleteCommentBtn}>Delete</button>
        </div>
      );
    });
  }
  const editBtn = () => {
    if (!user || user.id === userId) {
      history.push(`/songs/${id}/edit`);
    } else {
      alert("This is not your song!");
    }
    history.push(`/songs/${id}/edit`);
  };
  const deleteBtn = () => {
    if (!user || user.id === userId) {
      dispatch(removeSong(id));
    } else {
      alert("This is not your song!");
    }

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

  // console.log(userId);
  const details = song.map((el, i) => {
    // console.log(el);
    userId = el.userId;
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
          <div className="song-img">
            <img
              className="detail-img"
              src={el.imageUrl}
              alt=""
              height="100x"
              width="80x"
            ></img>
          </div>
          <audio controls src={el.url}>
            <a href={el.url}>Link</a>
          </audio>
          {/* <div>Url:{el.url}</div> */}
        </div>
        <div className="song-info">
          <h1>Title:{el.title}</h1>
          <h2>Upload By: {uploadedBy}</h2>
          <h3>Description: {el.description}</h3>
          {/* <Link to={`/songs/${el.id}/edit`}>Edit</Link> */}
          <button onClick={editBtn}>Edit</button>
          <button onClick={deleteBtn}>Delete</button>
        </div>
      </>
    );
  });
  return (
    <>
      <div key={id} className="song-containerer">
        {details}
      </div>
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
