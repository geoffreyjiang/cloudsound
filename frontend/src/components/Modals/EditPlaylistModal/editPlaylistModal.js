import { React, useState } from "react";
import { EPlaylistModal } from "../../../context/modal";
import EditPlaylistForm from "./EditPlaylistForm";
const EditPlaylistModal = ({ playlistId }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Edit Playlist</button>
            {open && (
                <EPlaylistModal onClose={() => setOpen(false)}>
                    <EditPlaylistForm
                        setOpen={setOpen}
                        playlistId={playlistId}
                    />
                </EPlaylistModal>
            )}
        </>
    );
};

export default EditPlaylistModal;
