import AudioPlayer from "react-h5-audio-player";

const MusicPlayer = ({ songId, songTitle }) => {
    return (
        <div className="audio-player-container">
            <AudioPlayer src={songId} header={songTitle} />
        </div>
    );
};

export default MusicPlayer;
