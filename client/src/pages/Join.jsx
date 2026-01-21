import React, { useEffect, useState } from 'react'
import { socket } from '../socket';

function Join() {

   const [code, setcode] = useState("");
    const [username, setusername] = useState("user1");
    const [error, setError] = useState(null);

    useEffect(() => {
        socket.on("joined-room", ({ roomId, username }) => {
            console.log(`${username} joined room ${roomId}`);
        });

        socket.on("error", (message) => {
            console.error("Error:", message);   
            setError(message);
        });
    }, []);

 

    const joinRoom = (roomId, username) => {
        console.log("Joining room:", roomId, "as", username);   
        socket.emit("join-room", { roomId, username });
    };




    return (
        <>
            <div>
                <input type="text"
                    placeholder='Room Code'
                    value={code}
                    onChange={(e) => setcode(e.target.value)} />

                <input
                    type="text"
                    placeholder='Username'
                    value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            {code && username && <button onClick={() => joinRoom(code, username)}>Join Room</button>}
       
       {error && <div className="error">{error}</div>}
        </>
    )
}

export default Join