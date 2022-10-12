import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useState } from "react";
import LoginButton from "../components/Buttons/LoginButton";
import SocialMediaLoginButton from "../components/Buttons/SocialMediaLoginButton";
import Input from "../components/Input";

export default function Login (props) {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="bg-gray-300 min-w-full h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-md w-96 h-96 shadow-md px-6">
                <h1 className="font-bold text-xl tracking-wide">Pet Shop Manager</h1>
                <form>
                    <Input 
                        required
                        id={"username"}
                        type={"text"}
                        labelText={"Usuário"}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input 
                        required
                        id={"password"}
                        type={"password"}
                        labelText={"Senha"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <section className="flex flex-col gap-2">
                        <LoginButton 
                            onClick={() => console.log('teste')}/>
                        <SocialMediaLoginButton 
                            socialMediaName={"Google"} 
                            socialMediaIcon={<FontAwesomeIcon icon={faGoogle} />} 
                            onClick={() => console.log('teste')}/>
                        <SocialMediaLoginButton 
                            socialMediaName={"Facebook"} 
                            socialMediaIcon={<FontAwesomeIcon icon={faFacebook} />} 
                            onClick={() => console.log('teste')}/>
                    </section>
                    
                </form>
                
            </div>
        </div>
        
    )
}