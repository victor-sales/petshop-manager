import { faArrowDown, faCaretDown, faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import ConfirmSignOutText from "../ConfirmSignOutText";
import ChangePasswordForm from "../Form/Forms/ChangePasswordForm";
import HeaderLink from "./HeaderLink";

export default function Header() {

    const { handleSignOut } = useAuthContext()
    const router = useRouter();

    const [navbar, setNavbar] = useState(false);
    const [changePassword, setChangePassword] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <nav className="w-full bg-white border-b border-gray-300 shadow-md">
            <div className="justify-between px-4 mx-auto items-center lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <FontAwesomeIcon
                            className="h-6 w-6 text-gray-800"
                            icon={faDog}
                        />
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-900"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}>
                        <ul className="items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0 m-0">
                            {router.asPath === "/agendamento" ? <></> :
                            <>
                                <HeaderLink url="/" title="Dashboard" />
                                <HeaderLink url="/servicos" title="Serviços" />
                                <HeaderLink url="/usuarios" title="Usuários" />
                                <HeaderLink url="/animais" title="Animais" />
                                <HeaderLink url="/especies" title="Espécies" />
                                <HeaderLink url="/racas" title="Raças" />
                                <HeaderLink url="/produtos" title="Produtos" />
                                <HeaderLink url="/vendas" title="Vendas" /></>}
                        </ul>
                        <div className="mt-4 space-y-2 lg:hidden md:hidden flex flex-col items-center gap-3">
                            <button
                                onClick={() => setModalVisible(true)}
                                className="inline-block w-full p-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                                Sair
                            </button>
                            <button className="inline-block w-full p-2 text-sm text-gray-900 border border-gray-900 rounded-md">Alterar Senha</button>
                        </div>
                        
                    </div>
                </div>
                
                <div className="hidden space-x-2 md:flex md:items-center">
                    <div className="relative mr-2 border-r border-gray-900">
                           
                            <button onClick={() => setChangePassword(!changePassword)} className="text-sm text-gray-900 flex items-center gap-2 pr-3">
                                <FontAwesomeIcon
                                    className="h-4 w-4"
                                    icon={faCaretDown}
                                />
                                <span>Alterar Senha</span>
                            </button>
                        {changePassword ? 
                            <div className="absolute z-10 bg-white p-2 border border-gray-300 rounded-md top-5 right-10 w-60">
                                <ChangePasswordForm />
                            </div>
                            : <></>
                        }
                            </div>
                    <button
                        onClick={() => setModalVisible(true)}                        
                        className="px-4 py-1 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                        Sair
                    </button>
                    
                </div>
            </div>
            <Modal
                key={"log-out"}
                onOk={() => handleSignOut()}
                onCancel={() => setModalVisible(false)}
                okText="Confirmar"
                cancelText="Fechar"
                title="Sair"
                open={modalVisible}>
                    <ConfirmSignOutText />
            </Modal>
        </nav>
    );
}
