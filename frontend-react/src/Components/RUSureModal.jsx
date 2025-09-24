import { useState } from "react"

export default function RUSureModal({message, yesButton, noButton, func, id, onClose}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center fixed inset-0 text-white">
            <div className="w-[40vw] h-[20vh] m-[3vw] bg-slate-500 flex flex-col p-5 rounded-xl">
                <p className="flex-1">{message}</p>
                <div className=" flex-2 ml-auto mb-[2vh]" >
                    <button onClick={() => {func(id); onClose(false)}} className="bg-gray-700 rounded-3xl py-[0.5vh] px-[1vw] hover:opacity-70 active:bg-gray-700">{yesButton}</button>
                    <button onClick={() => {onClose(false)}} className="ml-[2vw] rounded-3xl bg-gray-800  py-[0.5vh] px-[1vw] hover:opacity-70 active:bg-gray-800">{noButton}</button>
                </div>
            </div>
        </div>
    )
}