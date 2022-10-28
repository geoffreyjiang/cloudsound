import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createASong } from "../../store/songs";
import { useHistory } from "react-router-dom";

const CreateSongForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  // console.log(sessionUser);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  // const [errors, setErrors] = useState([]);
  // const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: sessionUser.id,
      title,
      // imageUrl,
      // url,
      description,
    };
    let newSong = await dispatch(createASong(data));
    console.log(newSong);
    // if (newSong) {
    //   history.push(`/songs/${newSong.id}`);
    // }
  };

  return (
    <>
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <div className="create-input">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="create-input">
            <label>Upload Image</label>
            <input
              type="input"
              name="title"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            ></input>
          </div>

          <div className="create-input">
            <label>Upload Song</label>
            <input
              type="input"
              name="title"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            ></input>
          </div>
          <div className="create-input">
            <label>Description</label>
            <textarea
              type="text"
              name="title"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="submitBtn" type="submit">
              Upload Song
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSongForm;
