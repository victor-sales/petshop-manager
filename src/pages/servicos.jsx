import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import {
    faPencil,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";

export default function Servicos(props) {
    const [visible, setVisible] = useState(false);

    const dataSource = [
        {
            id: "1",
            servico: "Consulta",
            datetime: "12/10 14:00",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
            sintomas:
                "mancando bastante, sinais de dor na pata traseira esquerda",
        },
        {
            id: "2",
            servico: "Banho e tosa",
            datetime: "12/10 15:00",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
            sintomas: "",
        },
        {
            id: "3",
            servico: "Banho e tosa",
            datetime: "26/10 14:00",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
            sintomas: "",
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Serviço",
            dataIndex: "servico",
            key: "servico",
        },
        {
            title: "Data/Hora",
            dataIndex: "datetime",
            key: "datetime",
        },
        {
            title: "Espécie",
            dataIndex: "especie",
            key: "especie",
        },
        {
            title: "Raça",
            dataIndex: "raca",
            key: "raca",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
        {
            title: "Sintomas",
            dataIndex: "sintomas",
            key: "sintomas",
        },
        {
            title: "Ações",
            key: "actions",
            render: (data) => {
                return (
                    <div className="flex flex-row gap-3">
                        <button
                            className="disabled:text-gray-400 text-blue-600"
                            onClick={(e) => setVisible(true)}
                        >
                            <FontAwesomeIcon
                                className="h-4 w-4 "
                                icon={faPencil}
                            />
                        </button>
                        <button
                            className="disabled:text-gray-400 text-red-600"
                            onClick={(e) => setVisible(true)}
                        >
                            <FontAwesomeIcon
                                className="h-4 w-4 "
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
                    <IconButton
                        iconName={faPlusCircle}
                        title="Novo Agendamento"
                    />
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
