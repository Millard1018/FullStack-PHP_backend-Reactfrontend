import { useState } from "react"

export default function RUSureModal({message, yesButton, noButton, func, id, onClose}) {
    return (
        <>
            <div className="flex justify-center items-center fixed inset-0 backdrop-blur-3xl opacity-70 bg-slate-900"></div>
            <div className="w-[40vw] h-[20vh] m-[3vw] bg-slate-500 flex flex-col p-5 rounded-xl fixed top-[30vh] left-[27vw] shadow-3xl text-white ">
                <p className="flex-1">{message}</p>
                <div className=" flex-2 ml-auto mb-[2vh]" >                    
                    <button onClick={() => {func(id); onClose(false)}} className="bg-gray-700 rounded-3xl py-[0.5vh] px-[1vw] hover:opacity-70 active:bg-gray-800">{yesButton}</button>
                    <button onClick={() => {onClose(false)}} className="ml-[2vw] rounded-3xl bg-gray-800  py-[0.5vh] px-[1vw] hover:opacity-70 active:bg-gray-900">{noButton}</button>
                </div>
            </div>
        </>
    )
}