import { useEffect } from "react";
import { getAllSongs } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./Songs.css";
// import { useHistory } from "react-router-dom";
// import SongDetail from "./SongDetail";
const GetAllSongs = () => {
  const songs = useSelector((state) => Object.values(state.songs));
  const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [url, setUrl] = useState(
  //   "https://s3.console.aws.amazon.com/s3/object/cloudsound-audio?region=us-west-1&prefix=02+Crunch+Time.mp3"
  // );
  // const [img, setImg] = useState("");
  // const [visible, setVisible] = useState(false);
  // const history = useHistory();
  useEffect(() => {
    const load = async () => {
      dispatch(getAllSongs());
    };
    load();
  }, [dispatch]);
  // console.log(songs);
  //   songs.forEach((el) => console.log(el.title));
  let data;

  // const renderDetail = () => {
  //   return (
  //     <div className="render-detail">
  //       <SongDetail />
  //     </div>
  //   );
  // };
  if (songs) {
    data = songs.map((el, i) => {
      return (
        <>
          <div className="song-details">
            <audio src={el.url}></audio>
          </div>
          <div key={el.id} className="card">
            <div key={i} className="image">
              <img
                className="card-img"
                src={el.imageUrl}
                alt="no pic avail!"
                // onClick={() => {
                //   history.push(`/songs/${id}`);
                // }}
              ></img>
              <div className="song-title">
                <a href={`/songs/${el.id}`}>{el.title}</a>
              </div>
            </div>
          </div>
        </>
      );
    });
  }
  return (
    <>
      {/* <h1>Browse New Music</h1> */}
      <div className="browse-text">
        <h2>Browse New Music</h2>
      </div>
      <div className="wrapper">
        <button
          className="icon"
          onClick={() => {
            document.querySelector(".data-container").scrollBy(-350, 0);
          }}
        >
          <i className="fa-solid fa-angles-left fa-3x" fa></i>
        </button>
        <div className="song-container">
          <div className="data-container">{data}</div>
        </div>
        <button
          className="icon"
          onClick={() => {
            document.querySelector(".data-container").scrollBy(350, 0);
          }}
        >
          <i className="fa-solid fa-angles-right fa-3x" fa></i>
        </button>
      </div>
    </>
  );
};

export default GetAllSongs;
