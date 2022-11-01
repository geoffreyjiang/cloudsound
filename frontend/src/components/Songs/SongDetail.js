import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { songById, getAllSongs } from "../../store/songs";
import { useSelector, useDispatch } from "react-redux";
const SongDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state);

  const song = useSelector((state) => Object.values(state.songs));
  useEffect(() => {
    const load = async () => {
      dispatch(songById(id));
      //   dispatch(getAllSongs());
    };
    load();
  }, [dispatch, id]);
  console.log(songs);
  const details = song.map((el) => {
    return (
      <>
        <img src={el.imageUrl} alt="" height="100x" width="80x"></img>
        <div>Title:{el.title}</div>
        <div>Description: {el.description}</div>
        {/* <div>Url:{el.url}</div> */}
        <audio
          controls
          src="https://cloudsound-audio.s3.us-west-1.amazonaws.com/Menu%20%28Prod%20By%20Monte%20Booker%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJHMEUCIQDP4AGRVOoToG%2BTz1cXjDFzL9OBpeWjpDNAgjIXxzF37wIgZvOUOzMcHXV4Anqr1K45tjdEtZEMQBQ60e3h6CWfeqQq5AIIbRABGgw3MTQxMTcxMTYxMDQiDGduHMcP5iW0mMVBoSrBAhQQyEmUJNAmOiCBPTe1krWxCdckKkf9AlZCYwIKYaZhp04fCSJ%2Feukt2VjC2qD1qHFzQgiLQqnzKE%2BA8pjyqRyAQFwJyito6kSsQBWP9o6ERgsF4l9sI%2BWeikyp7GTNufbapislFKbYAcNo7EtNP8weTZrujGWIQNiWt5SpTa9ZLZUZQKfMWbNGVFkVYzu8I0V8MfrPnxivde7EH4vdkRRrvwfFUpk%2FqoEJrtHuRKzBPpp4BfdwoP8Uk5nE0jZGAx9q%2FLPN7F%2F2Xry7iyW8GZ7k69s%2BpAO4S2AzsgjhPmPTua9W2TWAkXadv8lp%2Fws0Os6fPHK8rGvoDp1OvF1q5FBQFllgCtQyn%2FMpif%2Fe2CZomiu21Rvfh%2F04LZ%2FqPsj%2FKmRdFlWDMuBA9e4MG5BZeV9nfFvCGqHQPT4WF96KEknRMDDgjP2aBjqzAgkC5S35FfutqsR5CIsJ2PEak%2FOSReJvUNN5Vr%2F03%2BKXyuIumOYql63XijUxXAwh9XBk0iqKAyj5nNspqg1z6qWkyFI4q3MBG0mLtQ%2BV2vPN1I1r6hWTsqZDHtouoKNz%2F4NU4SvrBh9ISXZFw%2FzyS2jH6MPJW40kkoq5gy8TD5KufMnMOJo5EfkxB7K4jYl4TnSWDyER25rqBLrrRNPxmOmRfjIE52iPwTRlFPanzUcJPMIQq%2FPa3u7yNalDhl0r%2B2bbD%2Bit7FxBiokVbi3zOrrj4CLGh1Yb9W1lcwLxFc1RLlC7b8E5UBenHz9mbH8AEvH78wBqw2frZCmXzHp2ltCY7JYzKv2cp2t%2FN%2FVpy8TL5CsdeR9JSqe9VBtyZWkmnnQAbNCFeZdKizhA11t36IJC85U%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221031T040403Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA2MRFSODEOHDZ3F6R%2F20221031%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=1ccb9e2c7527960d864fc0741cdca43b08e21974943d91fc5f430fbd1c59fb06"
        >
          <a href="https://s3.console.aws.amazon.com/s3/object/cloudsound-audio?region=us-west-1&prefix=Menu+%28Prod+By+Monte+Booker%29.mp3"></a>
        </audio>
        <Link to={`/songs/${el.id}/edit`}>Edit</Link>
      </>
    );
  });
  return (
    <>
      <div>{details}</div>
    </>
  );
};

export default SongDetail;
