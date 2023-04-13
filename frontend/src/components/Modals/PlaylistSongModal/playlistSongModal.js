import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import AddPlaylistSongs from "./playlistSong";
const PlaylistSongModal = ({ playlistId }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Add Songs</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <AddPlaylistSongs
                        setOpen={setOpen}
                        playlistId={playlistId}
                    />
                </Modal>
            )}
        </>
    );
};

export default PlaylistSongModal;
