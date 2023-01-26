import { useEffect, useState } from "react";
import SignInForm from "../components/Form/Forms/SignInForm";
import SignUpForm from "../components/Form/Forms/SignUpForm";

export default function Login (props) {

    const [signUp, setSignUp] = useState(false)

    return (
        <div className="bg-gray-300 min-w-full min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-md w-96 shadow-md px-6 py-2 mx-2">
                <h1 className="font-bold text-xl tracking-wide">Pet Shop Manager</h1>
                <div className="w-full">
                    {signUp ? 
                        <SignUpForm setSignUp={setSignUp}/> : 
                        <SignInForm setSignUp={setSignUp}/>
                    }
                </div>
            </div>
        </div>
        
    )
}