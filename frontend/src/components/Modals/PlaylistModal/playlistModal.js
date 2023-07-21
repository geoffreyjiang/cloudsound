import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import PlaylistForm from "./playlistForm";
const PlaylistModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Create Playlist</button>
            {/* <i className="fa-solid fa-plus" onClick={() => setOpen(true)}></i> */}
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <PlaylistForm setOpen={setOpen} />
                </Modal>
            )}
        </>
    );
};

export default PlaylistModal;
