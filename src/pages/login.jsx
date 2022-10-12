import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useState } from "react";
import LoginButton from "../components/Form/FormInputs/Buttons/LoginButton";
import SocialMediaLoginButton from "../components/Form/FormInputs/Buttons/SocialMediaLoginButton";
import Input from "../components/Form/FormInputs/Input";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Login (props) {

    const router = useRouter()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Layout>
            <div className="bg-gray-100 flex flex-col items-center justify-center gap-4 border border-gray-100 rounded-md w-96 h-96 shadow-md px-6 mx-2">
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
                            onClick={() => router.push("/")}/>
                        <a href="" className="text-sm text-center underline">Não possui cadastro? Criar uma conta</a>
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
        </Layout>
        
    )
}