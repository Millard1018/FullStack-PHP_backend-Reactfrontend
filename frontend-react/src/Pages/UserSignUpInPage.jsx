import { useEffect, useState } from "react";
import { UserRound, Mail, Lock } from "lucide-react";

export default function UserSignUpInPage() {

    const [signUp, setSignUp] = useState(true);
    const [bgUrl, setBgUrl] = useState("");
    const [signUpForm, setSignUpForm] = useState({
        username: '', email: '', password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signIn, setSignIn] = useState(false);

    const [error, setError] = useState('');

    useEffect(() => {
        // Picsum gives a random image each time
        const randomUrl = `https://picsum.photos/1920/1080?random=${Date.now()}`;
        setBgUrl(randomUrl);
    }, []);

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!signUpForm.username || !signUpForm.email || !signUpForm.password) {
            alert("All fields must not left blank");
            return;
        }

        if(signUpForm.password !== confirmPassword) {
            alert("Password and Confirm Password must be the same!");
            return;
        }

        async function setUser() {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/users', {
                    method: 'POST',
                    header: {'Content-type': 'application/json'},
                    body: JSON.stringify(signUpForm),
                })
                if(!res.ok) {
                    const data = await res.json();
                    console.log(data.message);
                    throw new Error(data.message)
                }
            } catch (err) {
                setError(err.message);
                setTimeout(() => {setError('')}, 3000);
                alert(err.message);
            }
        }
        setUser();
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!signUpForm.username || !signUpForm.email || !signUpForm.password) {
            alert("All fields must not left blank");
            return;
        }

        async function logUser() {
            try {
                const res = await fetch('');
                if(!res.ok) {
                    const data = await res.json();
                    console.log(data.message);
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message)
                setTimeout(()=>{setError('')}, 3000);
            }
        }
    }
 
    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center text-white " 
            style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center",}}>
                <div className="absolute flex items-center justify-center flex-col h-[60vh] w-[25vw] rounded-md bg-slate-200 shadow-2xl text-black">
                    <div className="flex-2 flex flex-col" >
                        <h1 className="font-bold text-[2.5em] pt-[2vh] flex justify-center" >{signUp ? "Sign up" : "Sign in"}</h1>
                        <h2 className="font-semibold text-[0.8em] pt-[1vh] flex justify-center" >{signUp ? "Sign up" : "Sign in"} to continue</h2>
                    </div>
                    <div className={`flex flex-1 justify-center pt-[4vh] ${signIn ? "pt-[8vh]" : ""}`}>
                        <form className="flex flex-col space-y-5 " onSubmit={signUp ? handleSignUp : handleSignIn} >
                            <label className="flex" ><UserRound className="mr-2"/><input type="text" className="p-1 pl-3 border rounded-3xl" 
                            placeholder="Username" value={signUpForm.username} onChange={(e) => setSignUpForm(prev => ({...prev, username: e.target.value}))}  /></label>

                            {signUp && (<label className="flex" ><Mail className="mr-2"/><input type="text" className="p-1 pl-3 border rounded-3xl" 
                            placeholder="Email" value={signUpForm.email} onChange={(e) => setSignUpForm(prev => ({...prev, email: e.target.value}))}/></label>)}
                            
                            <label className="flex" ><Lock className="mr-2"/><input type="password" className="p-1 pl-3 border rounded-3xl" 
                            placeholder="Password" value={signUpForm.password} onChange={(e) => setSignUpForm(prev => ({...prev, password: e.target.value}))}/></label>

                            {signUp && (<label className="flex" ><Lock className="mr-2"/><input type="password" className="p-1 pl-3 border rounded-3xl" 
                            placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></label>)}
                            
                            <button type="submit" className="bg-blue-500 w-fit mx-auto px-3 py-2 rounded-3xl hover:font-semibold hover:bg-blue-600 active:opacity-60" >{signUp ? "Sign up" : "Sign in"}</button>

                            {signIn && (<button className="pt-10 w-fit mx-auto hover:text-blue-400 hover:border hover:border-b-blue-400 active:opacity-60">Forgot Password</button>)}
                        </form>
                    </div>
                </div>
                <div className="absolute flex bottom-[15vh]" ><p className="pr-2">{signUp ? "Already have an account?" : "Don't have an account?"}</p><button className="border-0 border-b-2 border-blue-400 text-blue-400 hover:text-blue-600 hover:border-blue-600 active:opacity-60" 
                onClick={() => {
                    setSignUp(!signUp);
                    setSignIn(!signIn);

                }}>{signUp ? "Sign in" : "Sign up"}</button></div>
            </div>
        </>
    )
}