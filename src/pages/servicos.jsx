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
import ConfirmRemoveText from "../components/ConfirmRemoveText";
import AddScheduleForm from "../components/Form/Forms/Schedules/AddScheduleForm";
import EditScheduleForm from "../components/Form/Forms/Schedules/EditScheduleForm";


export default function Servicos(props) {
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")


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
            confirmado: true
        },
        {
            id: "2",
            servico: "Banho e tosa",
            datetime: "12/10 15:00",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
            sintomas: "",
            confirmado: true

        },
        {
            id: "3",
            servico: "Banho e tosa",
            datetime: "26/10 14:00",
            especie: "Cachorro",
            raca: "SRD",
            descricao: "",
            sintomas: "",
            confirmado: false

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
            title: "Confirmado",
            dataIndex: "confirmado",
            key: "confirmado",
            render: (status) => status ? "SIM" : "NÃO" 
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

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { setAction("ADD"); setVisible(true) }}/>
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
                {action === "ADD" ? <AddScheduleForm /> : action === "EDIT" ? <EditScheduleForm /> : <ConfirmRemoveText />}
            </Modal>
        </Layout>
    );
}
