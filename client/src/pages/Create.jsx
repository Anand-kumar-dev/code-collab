import React, { useEffect } from 'react'
import { socket } from '../socket';

function Create() {
    const createRoom = () => {
        socket.emit("create-room");
    };

    useEffect(() => {
        socket.on("room-created", ({ roomId }) => {
            console.log("Room created:", roomId);
        });
    }, []);

    return (
        <div>Create</div>
    )
}

export default Create