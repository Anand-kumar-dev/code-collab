import { useEffect, useState } from 'react'
import { socket } from '../socket';
import Editors from '../components/Editors';

function Join() {

    const [RoomId, setRoomId] = useState("");
    const [username, setUsername] = useState("user1");
    const [error, setError] = useState(null);
    const [joined, setJoined] = useState(false);
    const [notification, setnotification] = useState("");

    useEffect(() => {
        socket.on("joined-room", ({ roomId, username }) => {
            console.log(`${username} joined room ${roomId}`);

        });
        socket.on("user-joined", ({ username }) => {
            console.log(`${username} joined the room`);
            setnotification(`${username} joined the room`);
            setTimeout(() => setnotification(""), 3000);
        });

        socket.on("error", (message) => {
            console.error("Error:", message);
            setJoined(false);
            setError(message);
        });
    }, []);



    const joinRoom = (roomId, username) => {

        console.log("Joining room:", roomId, "as", username);
        socket.emit("join-room", { roomId, username });
        setJoined(true);
    };




    return (
        <>
            {!joined ? (<div className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-2xl p-6 shadow-xl">

                <h2 className="text-2xl font-bold text-white mb-4">
                    Simple Form
                </h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="
                               w-full mb-4
                               bg-zinc-900 border border-zinc-700
                               rounded-lg px-4 py-3
                               text-white placeholder:text-zinc-500
                               outline-none transition
                               focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                             "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Input 2 */}
                <input
                    type="email"
                    placeholder="Room ID"
                    className="
                          w-full mb-4
                          bg-zinc-900 border border-zinc-700
                          rounded-lg px-4 py-3
                          text-white placeholder:text-zinc-500
                          outline-none transition
                          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                        "
                    value={RoomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />

                <button
                    className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition"
                    onClick={() => joinRoom(RoomId, username)}
                >
                    Submit
                </button>

            </div>)
             : (<div className="h-screen w-full flex flex-col bg-[#121212]">

                {/* Header */}
                <div className="p-4 border-b border-zinc-800">
                    <h2 className="text-white font-semibold">
                        Room ID: {RoomId}
                    </h2>
                    {notification && (
                        <div className="mt-2 text-sm text-green-400">
                            {notification}
                        </div>
                    )}
                </div>

                {/* Editor */}
                <div className="flex-1 overflow-hidden">
                    <Editors />
                </div>

            </div>)
            }

            {error && <div className="error">{error}</div>}
        </>
    )
}

export default Join