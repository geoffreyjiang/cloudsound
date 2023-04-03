import { useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
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

    let commentId;
    let allComments;
    let commentUserId;
    let userId;

    let delBtn;

    if (comments) {
        let username;
        allComments = comments.map((el) => {
            let y;
            commentId = el.id;

            if (!user) {
                return (
                    <div className="comments-section">
                        <div>{el.body}</div>
                        <div>By: {el.username}</div>
                    </div>
                );
            } else if (el.username !== user.username) {
                return (
                    <div className="comments-section">
                        <div>{el.body}</div>
                        <div>By: {el.username}</div>
                    </div>
                );
            } else {
                return (
                    <div className="my-comments-section comments-section">
                        <div>{el.body}</div>
                        <div>
                            By: {el.username}
                            <button
                                className="comment-btn"
                                onClick={async () => {
                                    await dispatch(deleteComment(el.id));
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            }
        });
    }
    const editBtn = () => {
        if (!user || user.id !== userId) {
            alert("This is not your song!");
        } else if (user.id === userId) {
            history.push(`/songs/${id}/edit`);
        }
        // history.push(`/songs/${id}/edit`);
    };
    const deleteBtn = () => {
        if (!user || user.id !== userId) {
            alert("This is not your song!");
        } else if (user.id === userId) {
            dispatch(removeSong(id));
            history.push(`/songs/`);
        }
    };

    useEffect(() => {
        const load = async () => {
            dispatch(songById(id));

            dispatch(getComments(id));
        };
        load();
    }, [dispatch, id]);

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

                        <button onClick={editBtn}>Edit</button>
                        <button onClick={deleteBtn}>Delete</button>
                        <audio id="song-audio" controls src={el.url}>
                            <a href={el.url}>Link</a>
                        </audio>
                    </div>
                </div>
            </>
        );
    });

    // loadComments();
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
