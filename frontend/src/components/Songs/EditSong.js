import { useSelector } from "react-redux";
import { updateSong, songById } from "../../store/songs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
const EditSong = () => {
  const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => Object.values(state.songs));
  const history = useHistory();
  // console.log(user.id);
  let userId;
  let t;
  let i;
  let u;
  let d;
  song.forEach((el) => {
    console.log(el.userId);
    userId = el.userId;
    t = el.title;
    u = el.url;
    d = el.description;
    i = el.imageUrl;
  });
  console.log(userId);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(t);
  const [imageUrl, setImageUrl] = useState(i);
  const [url, setUrl] = useState(u);
  const [description, setDescription] = useState(d);

  useEffect(() => {
    dispatch(songById(id));
    // dispatch(updateSong());
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      imageUrl,
      url,
      description,
    };
    let newSong = await dispatch(updateSong(id, data));
    if (newSong) {
      history.push(`/songs/${id}`);
    }
  };

  return (
    <>
      <div key={id} className="create-form">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <label>Upload Image</label>
          <input
            type="input"
            name="title"
            value={imageUrl}
            pattern="https://.*"
            title="Please enter a valid image url ('https://...')"
            onChange={(e) => setImageUrl(e.target.value)}
          ></input>

          <label>Upload Song</label>
          <input
            type="input"
            name="title"
            value={url}
            pattern="https://.*"
            title="Please enter a valid song url ('https://...')"
            onChange={(e) => setUrl(e.target.value)}
          ></input>

          <label>Description</label>
          <textarea
            type="text"
            name="title"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button className="submitBtn" type="submit">
            Edit Song
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSong;
