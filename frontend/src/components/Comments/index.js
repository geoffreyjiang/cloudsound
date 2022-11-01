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

    const data = {
      userId: user.id,
      songId: id,
      body,
      user,
    };

    let newComment = await dispatch(createComment(id, data));
    setBody("");
    if (newComment) {
      history.push(`/songs/${id}`);
    }
  };
  return (
    <>
      <div className="create-form">
        <form onSubmit={handleSubmit}>
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
