import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket';
import Userinput from '../components/Userinput';
import Editors from '../components/Editors';

function Create() {
  const [RoomId, setRoomId] = React.useState("");
  const [roomuser, setroomuser] = React.useState("");
  const [notification, setnotification] = React.useState("");
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const handleMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };


  const getValue = () => {
    const model = editorRef.current.getValue();
     console.log("Sending model to new user:", model);  

       socket.emit("setmodel", {roomId : RoomId, model});
  };

  const setValue = () => {
    editorRef.current.setValue("// New code set programmatically\nfunction hello() {\n  console.log('Hello, world!');\n}\n");
    const model = editorRef.current.getModel();
    console.log(`model uri: ${model.uri.toString()} and version id: ${model.getVersionId()} `);
  };


useEffect(() => {
  if (RoomId){
    console.log(editorRef.current.getValue());

  }

}, []);  


  useEffect(() => {

    socket.on("room-created", ({ roomId }) => {
      console.log("Room created:", roomId);
      setRoomId(roomId);
    });

    socket.on("user-joined", ({ username }) => {
      setnotification(`${username} joined the room`);
      setTimeout(() => setnotification(""), 3000);
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
        <div onClick={getValue}>get value</div>
        <div onClick={setValue}>set value</div>

        {notification && (
          <div className="mt-2 text-sm text-green-400">
            {notification}
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editors handleMount={handleMount} />
      </div>
    </div>
  );
}

export default Create