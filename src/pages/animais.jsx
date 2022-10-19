import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";

export default function Animais(props) {
    const [visible, setVisible] = useState(false);

    const dataSource = [
        {
            id: "1",
            nome: "Bob",
            tutor: "Mario Alberto",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
        },
        {
            id: "2",
            nome: "Mel",
            tutor: "Mario Alberto",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
        },
        {
            id: "3",
            nome: "Chico",
            tutor: "Carla Patrícia",
            especie: "Cachorro",
            raca: "Pug",
            descricao: "",
        },
        {
            id: "4",
            nome: "Beatriz",
            tutor: "Maria Paula",
            especie: "Cachorro",
            raca: "Pastor Alemão",
            descricao: "",
        },
        {
            id: "5",
            nome: "Malu",
            tutor: "Maria Paula",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
        },
        {
            id: "6",
            nome: "Peter",
            tutor: "Victor Andrade",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
        },
        {
            id: "7",
            nome: "Hanna",
            tutor: "Eduardo Souza",
            especie: "Cachorro",
            raca: "Fila",
            descricao: "",
        },
        {
            id: "8",
            nome: "Akira",
            tutor: "Eduardo Souza",
            especie: "Cachorro",
            raca: "Fila",
            descricao: "",
        },
        {
            id: "9",
            nome: "Theo",
            tutor: "Victor Andrade",
            especie: "Gato",
            raca: "SRD",
            descricao: "",
        },
        {
            id: "10",
            nome: "Lola",
            tutor: "Jordânia Peixoto",
            especie: "Gato",
            raca: "SRD",
            descricao: "",
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
            title: "Tutor",
            dataIndex: "tutor",
            key: "tutor",
        },
        {
            title: "Raça",
            dataIndex: "raca",
            key: "raca",
        },
        {
            title: "Espécie",
            dataIndex: "especie",
            key: "especie",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
        {
            title: "Ações",
            key: "actions",
            render: () => {
                return (
                    <div className="flex flex-row gap-3">
                        <button onClick={(e) => setVisible(true)}>
                            <FontAwesomeIcon
                                className="h-4 w-4 text-blue-600"
                                icon={faPencil}
                            />
                        </button>
                        <button onClick={(e) => setVisible(true)}>
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

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    <IconButton iconName={faPlusCircle} title="Novo Animal" />
                </div>
                <Table size="small" dataSource={dataSource} columns={columns} />
            </Container>
            <Modal
                key={"new-breed"}
                onOk={() => setVisible(false)}
                title="Modal"
                open={visible}
            >
                Isso é um teste
            </Modal>
        </Layout>
    );
}
