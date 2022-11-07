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
  let commentUserId;
  let userId;
  // console.log(commentUserId);
  // console.log(user.id);
  let delBtn;
  const deleteCommentBtn = () => {
    // if (!user || user.id === commentUserId) {
    //   dispatch(deleteComment(commentId));
    // } else {
    //   alert("this is not your comment!");
    // }
    dispatch(deleteComment(commentId));
    window.location.reload();
  };
  if (comments) {
    allComments = comments.map((el) => {
      console.log(el);

      // commentUserId = el.User.id;
      let y;
      commentId = el.id;
      !el.User ? (y = "anon") : (y = el.User.username);

      if (!user) {
        return (
          <div className="comments-section">
            <div>{el.body}</div>
            <div>By: {y}</div>
            {/* <button onClick={deleteCommentBtn}>Delete</button> */}
          </div>
        );
      } else if (el.User.id !== user.id) {
        return (
          <div className="comments-section">
            <div>{el.body}</div>
            <div>By: {y}</div>
            {/* <button onClick={deleteCommentBtn}>Delete</button> */}
          </div>
        );
        // commentUserId = el.User.id;
      } else {
        return (
          <div className="comments-section">
            <div>{el.body}</div>
            <div>By: {y}</div>
            <button onClick={deleteCommentBtn}>Delete</button>
          </div>
        );
      }
    });
  }
  const editBtn = () => {
    if (!user || user.id !== userId) {
      alert("This is not your song!");
    } else if (user.id !== userId) {
      history.push(`/songs/${id}/edit`);
    }
    // history.push(`/songs/${id}/edit`);
  };
  const deleteBtn = () => {
    if (!user || user.id !== userId) {
      alert("This is not your song!");
    } else if (user.id !== userId) {
      dispatch(removeSong(id));
      history.push(`/songs/`);
    }
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

          {/* <div>Url:{el.url}</div> */}
        </div>
        <div className="song-info">
          <label className="detail-label">
            Title <h2>{el.title}</h2>
          </label>
          <label className="detail-label">
            Uploaded By <h2>{uploadedBy}</h2>
          </label>
          <label className="detail-label">
            Description<h2>{el.description}</h2>
          </label>

          {/* <Link to={`/songs/${el.id}/edit`}>Edit</Link> */}
          <button onClick={editBtn}>Edit</button>
          <button onClick={deleteBtn}>Delete</button>
          <audio controls src={el.url}>
            <a href={el.url}>Link</a>
          </audio>
        </div>
      </>
    );
  });
  return (
    <>
      <div key={id} className="song-containerer">
        {details}
      </div>
      <section className="comment-section">
        <h1>Comments</h1>
        {allComments}

        <br></br>
        <br></br>
        <h2>Leave a comment</h2>
        <CreateComment />
      </section>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

export default SongDetail;
