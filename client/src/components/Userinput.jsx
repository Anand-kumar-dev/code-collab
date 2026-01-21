import React from 'react'

function Userinput({ heading, value ,onchange  , onClick}) {
    return (
        <>
            <div className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-2xl p-6 shadow-xl">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    {heading}
                </h2>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Type here..."
                    className="
                               w-full
                               mb-4
                               bg-zinc-900
                               border border-zinc-700
                               rounded-lg
                               px-4 py-3
                               text-white
                               placeholder:text-zinc-500
                               outline-none
                               transition
                               focus:border-blue-500
                               focus:ring-1
                               focus:ring-blue-500
                             "
                     value={value}
                     onChange={onchange}
                     />

                {/* Button */}
                <button 
                className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition"
                onClick={onClick}>

                    Submit
                </button>   
            </div>
        </>

    )
}

export default Userinput