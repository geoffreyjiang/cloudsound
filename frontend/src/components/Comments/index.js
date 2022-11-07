import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comments";
// import { useHistory } from "react-router-dom";
const CreateComment = () => {
  const [body, setBody] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login!");
    }

    window.location.reload();
    const data = {
      userId: user.id,
      songId: id,
      body,
      user: user.username,
    };

    if (!body) {
      alert("Comment cannot be empty!");
    } else await dispatch(createComment(id, data));
    setBody("");
    // if (newComment) {
    //   window.location.reload();
    // }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {/* <h1>Comment</h1> */}
          <div className="create-input">
            <textarea
              type="text"
              name="comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>

          <div>
            <button className="submitBtn" type="submit">
              Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateComment;
