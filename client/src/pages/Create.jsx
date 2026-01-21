import React, { useEffect } from 'react'
import { socket } from '../socket';
import Userinput from '../components/Userinput';
import Editors from '../components/Editors';

function Create() {
    const [RoomId, setRoomId] = React.useState("");
    const [roomuser, setroomuser] = React.useState("");

    useEffect(() => {
        socket.on("room-created", ({ roomId }) => {
            console.log("Room created:", roomId);
            setRoomId(roomId);
        });
    }, []);

    const createRoom = () => {
        socket.emit("create-room");
        setroomuser("host");
    };
  if (!roomuser) {
    return (
      <Userinput
        heading="Name your Room"
        value={RoomId}
        onChange={(e) => setRoomId(e.target.value)}
        onClick={createRoom}
      />
    );
  }

   return (
    <div className="h-screen w-full flex flex-col bg-[#121212]">
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-white font-semibold">
          Room ID: {RoomId}
        </h2>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editors />
      </div>

    </div>
  );
}

export default Create