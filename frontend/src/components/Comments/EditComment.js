import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comments";
// import { useHistory } from "react-router-dom";
const EditComment = () => {
  const [body, setBody] = useState("");
  const { id } = useParams();
  const history = useHistory();
  //   const user = useSelector((state) => state.session.user);
  const comment = useSelector((state) => state);
  console.log(comment);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      body,
    };

    let newComment = await dispatch(editComment(id, data));
    setBody("");
    if (newComment) {
      history.push(`/songs`);
    }
    // window.location.reload();
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

export default EditComment;
