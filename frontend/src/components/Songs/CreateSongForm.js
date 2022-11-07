import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
const CreateSongForm = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  // console.log(sessionUser.id);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const err = [];
    if (!title.length) err.push("Title required");
    if (!url.length) err.push("Url required");
    if (!description) err.push("Description required");
    if (!imageUrl.length) err.push("Image url required");

    setErrors(err);
  }, [title, url, description, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, "title");
    // console.log(imageUrl, "img");
    // console.log(url, "url");
    // console.log(description, "description");
    // if (!imageUrl.startsWith("https://")) alert("Invalid image url!");
    // if (!url.startsWith("https://")) alert("Invalid song url!");
    setSubmitted(true);
    if (!sessionUser) {
      alert("User must be logged in!");
    }
    const data = {
      title,
      imageUrl,
      url,
      description,
      userId: sessionUser.id,
    };
    // console.log(data);
    // if (data && data.errors) setErrors(data.errors);
    let newSong = await dispatch(createSong(data));
    setSubmitted(false);

    if (newSong) {
      history.push(`/songs`);
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <form className="create-form" onSubmit={handleSubmit}>
          {submitted && errors.length > 0 && (
            <div>
              <ul>
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <h2>Upload A Song</h2>
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
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <div className="create-input">
              <label>Image Url</label>
              <input
                type="input"
                name="image"
                value={imageUrl}
                title="Please enter a valid image url ('https://...')"
                onChange={(e) => setImageUrl(e.target.value)}
                pattern="https://.*"
              ></input>
            </div>

            <div className="create-input">
              <label>Song Url</label>
              <input
                type="input"
                name="song"
                value={url}
                title="Please enter a valid song url ('https://...')"
                pattern="https://.*"
                onChange={(e) => setUrl(e.target.value)}
              ></input>
            </div>

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
