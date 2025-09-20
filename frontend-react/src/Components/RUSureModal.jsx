export default function RUSureModal({message, button1, button2}) {
    return (
        <div className="w-screen h-screen flex justify-center items-center absolute">
            <div className="w-[20vw] h-[10vh] m-[3vw]">
                {message=message}
                <button>{button1=button1}</button>
                <button>{button2=button2}</button>
            </div>
        </div>
    )
}