import './App.css'
import Input from './components/Input';
import Create from './pages/create';
import Join from './pages/Join';
import { socket } from './socket'
import { useEffect, useState } from 'react'





function App() {


  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server with ID:', socket.id);
  //   });

  // }, []);


  const [page, setPage] = useState("");

  const joinOnclick = () => {
    setPage("join")
  }
  const createOnclick = () => {
    setPage("create")
  }


  if (page) {
    return (
      <>
        {page === "join" && <Join />}
        {page === "create" && <Create />}
      </>
      )
  }

  return (
    <>
      <div className='w-screen p-10 max-w-md bg-[#111] border border-zinc-800  rounded-2xl shadow-xl'>
        <Input joinRoom={joinOnclick} createRoom={createOnclick} />

      </div>

    </>
  )
}

export default App
