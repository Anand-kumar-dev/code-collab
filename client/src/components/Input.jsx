import React, { useState } from "react";
import { useEffect } from "react";
import { socket } from '../socket'

function Input({joinRoom, createRoom}) {

 

    return (
        <div className="w-xxl">
            <h2 className="text-2xl font-bold mb-4 text-white">
                Welcome multi-coder
            </h2>


            <div className="mt-4 flex gap-3">
                <button
                    onClick={joinRoom}
                    className="flex-1 hover:border border-blue-500 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition"
                >
                    Join Room
                </button>

                <button
                    onClick={createRoom}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-lg font-medium transition border border-zinc-700"
                >
                    Create Room
                </button>
            </div>
        </div>

    )
}

export default Input;
