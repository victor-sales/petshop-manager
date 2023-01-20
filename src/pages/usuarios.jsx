import { v4 as uuid } from 'uuid';
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import ConfirmRemoveText from "../components/ConfirmRemoveText";
import { useEffect, useState } from "react";
import AddUserForm from "../components/Form/Forms/Users/AddUserForm";
import EditUserForm from "../components/Form/Forms/Users/EditUserForm";
import useUsersContext from "../hooks/useUsersContext"
import useAuthContext from "../hooks/useAuthContext";

export default function Usuarios(props) {
    
    const { handleGetUsers, handleCreateUser, loadingUsers } = useUsersContext()
    const { token } = useAuthContext()

    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [users, setUsers] = useState([])

    async function listUsers () {
        const arr = await handleGetUsers(token)

        if (arr) setUsers(arr)
        else setUsers([])
    }

    
    const columns = [
        {
            title: "Nome",
            dataIndex: "user_name",
            key: "user_name",
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Telefone",
            dataIndex: "phone_number",
            key: "phone_number",
            render: (phone) => phone ? phone : "-" 
        },
        {
            title: "Perfil",
            dataIndex: "profile",
            key: "profile",
        },
        {
            title: "Função",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Ações",
            key: "actions",
            render: () => {
                return (
                    <div className="flex flex-row gap-3">
                        <button onClick={(e) => { setAction("EDIT"); setVisible(true) }}>
                            <FontAwesomeIcon
                                className="h-4 w-4 text-blue-600"
                                icon={faPencil}
                            />
                        </button>
                        <button onClick={(e) => { setAction("REMOVE"); setVisible(true) }}>
                            <FontAwesomeIcon
                                className="h-4 w-4 text-red-600"
                                icon={faTrash}
                            />
                        </button>
                    </div>
                );
            },
        },
    ];


    const handleAddUser = async () => {
        const user = {
            id: "a731f84e-abdf-4326-bd52-720756946258",
            user_name: null,
            email: null,
            phone_number: null,
            profile: null,
            role: null
        }

        // const user = {"_id":"a731f84e-abdf-4326-bd52-720756746259","user_name":"Teste da silva editado novamente","email":"teste.silva@email.com","phone_number":"1234565654","profile":"customer","role":"customer",}

        let response = await fetch(`/api/users/${user.id}`, { method: "GET", body: JSON.stringify(user) })
        console.log(response)

        response = await response.json()
        console.log(response)

    }



    useEffect(() => {
        listUsers()
        //eslint-disable-next-line
    }, [token])

    useEffect(() => {
        console.log(users)
    }, [users])

    useEffect(() => {
        console.log(token)
    }, [token])

    return (
        <Layout>
            <Container>
            <div className="flex flex-col min-h-full gap-2 md:px-2 lg:px-0">
                    <div className="w-full flex flex-row-reverse">
                        <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { handleCreateUser(token, uuid(), "teste2", "tesac38130@nevyxus.com") }}/>
                        {/* <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { setAction("ADD"); setVisible(true) }}/> */}
                    </div>
                        <div className="w-full">
                            <Table
                                size="small" 
                                dataSource={users}
                                loading={loadingUsers}
                                columns={columns} 
                                scroll={{x: true}}
                                pagination={{}}/>
                        </div>
                    </div>
            </Container>
            <Modal
                key={"new-specie"}
                onOk={() => setVisible(false)}
                okText="Confirmar"
                cancelText="Fechar"
                title="Modal"
                open={visible}
            >
                {action === "ADD" ? <AddUserForm /> : action === "EDIT" ? <EditUserForm /> : <ConfirmRemoveText />}
            </Modal>
        </Layout>
    );
}
