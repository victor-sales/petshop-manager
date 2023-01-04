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

export default function Usuarios(props) {
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")


    const dataSource = [
        {
            id: "1",
            nome: "Mario Alberto",
            email: "mario.alberto@email.com",
            telefone: "(32) 3838-8091",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "2",
            nome: "Carla Patrícia",
            email: "carla.patricia@email.com",
            telefone: "(32) 2738-4604",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "3",
            nome: "Maria Paula",
            email: "maria.paula@email.com",
            telefone: "(32) 3642-8091",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "4",
            nome: "Victor Andrade",
            email: "victor.andrade@email.com",
            telefone: "(31) 2408-3828",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "5",
            nome: "Eduardo Souza",
            email: "eduardo.souza@email.com",
            telefone: "(35) 2211-1382",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "6",
            nome: "Jordânia Peixoto",
            email: "jordania.peixoto@email.com",
            telefone: "(37) 3874-5863",
            perfil: "Cliente",
            funcao: "Cliente"
        },
        {
            id: "7",
            nome: "Paulo Ricardo",
            email: "paulo.ricardo@email.com",
            telefone: "(37) 2133-6317",
            perfil: "Funcionario",
            funcao: "Caixa"
        },
        {
            id: "8",
            nome: "Antonio Lopes",
            email: "mario.alberto@email.com",
            telefone: "(35) 2815-0182",
            perfil: "Funcionario",
            funcao: "Veterinário"
        },
        {
            id: "9",
            nome: "Ronald Luiz",
            email: "ronald.luiz@email.com",
            telefone: "(35) 3304-2788",
            perfil: "Administrador",
            funcao: "Administrador"
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Telefone",
            dataIndex: "telefone",
            key: "telefone",
        },
        {
            title: "Perfil",
            dataIndex: "perfil",
            key: "perfil",
        },
        {
            title: "Função",
            dataIndex: "funcao",
            key: "funcao",
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

    const handleGetData = async () => {
        let response = await fetch("/api/users/5204f876-4067-449d-89eb-e7ad3774e9b4", { method: "GET" })
        response = await response.json()
        console.log(response)
    }
    const handleGetUsers = async () => {
        let response = await fetch("/api/users", )
        response = await response.json()
        console.log(response)
    }

    const handleAddUser = async () => {
        const user = {
            id: "a731f84e-abdf-4326-bd52-720756946258",
            user_name: "Teste da silva editado",
            email: "teste.silva22@email.com",
            phone_number: "1234565654",
            profile: "customer",
            role: "customer"
        }

        // const user = {"_id":"a731f84e-abdf-4326-bd52-720756746259","user_name":"Teste da silva editado novamente","email":"teste.silva@email.com","phone_number":"1234565654","profile":"customer","role":"customer",}

        let response = await fetch(`/api/users/${user.id}`, { method: "PUT", body: JSON.stringify(user) })
        console.log(response)

        response = await response.json()
        console.log(response)

    }

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { handleAddUser() }}/>
                    {/* <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { setAction("ADD"); setVisible(true) }}/> */}
                </div>
                <Table size="small" dataSource={dataSource} columns={columns} />
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
