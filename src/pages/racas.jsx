import { v4 as uuid } from 'uuid';
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import {
    faPencil,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import ConfirmRemoveText from "../components/ConfirmRemoveText";

import { useState } from "react";
import AddBreedForm from "../components/Form/Forms/Breeds/AddBreedForm";
import EditBreedForm from "../components/Form/Forms/Breeds/EditBreedForm";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useBreedsContext from "../hooks/useBreedsContext";

export default function Racas(props) {

    const { token } = useAuthContext()
    // const { handleGetBreeds,  breeds } = useBreedsContext()

    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")



    const dataSource = [
        {
            id: uuid(),
            breed_name: "SRD",
            specie: {id: "9515acf2-2774-4760-adf3-012ca8abf2e5", name: "Gato"},
            descricao: "Várias características possíveis",
        },
        {
            id: uuid(),
            breed_name: "SRD",
            specie: {id: "e4bdb4ab-2ac6-40b9-a259-9a69f614def9", name: "Cachorro"},
            descricao: "Várias características possíveis",
        },
        {
            id: uuid(),
            breed_name: "Pug",
            specie: {id: "e4bdb4ab-2ac6-40b9-a259-9a69f614def9", name: "Cachorro"},
            descricao: "Porte pequeno, pelo curto, focinho achatado",
        },
        {
            id: uuid(),
            breed_name: "Pastor Alemão",
            specie: {id: "e4bdb4ab-2ac6-40b9-a259-9a69f614def9", name: "Cachorro"},
            descricao:
                "Porte grande, pleo médio em cores marrom e preto majoritariamente, com orelhas pontudas",
        },
        {
            id: uuid(),
            breed_name: "Fila",
            specie: {id: "e4bdb4ab-2ac6-40b9-a259-9a69f614def9", name: "Cachorro"},
            descricao:
                "Porte grande, pelo curto, pele do rosto e orelhas caídas",
        },
        {
            id: uuid(),
            breed_name: "Sphynx",
            specie: {id: "9515acf2-2774-4760-adf3-012ca8abf2e5", name: "Gato"},
            descricao: "Gato pelado",
        },
        {
            id: uuid(),
            breed_name: "Persa",
            specie: {id: "9515acf2-2774-4760-adf3-012ca8abf2e5", name: "Gato"},
            descricao: "Pelagem longa, cara mais achatada, olhos mais juntos",
        },
        {
            id: uuid(),
            breed_name: "Siames",
            specie: {id: "9515acf2-2774-4760-adf3-012ca8abf2e5", name: "Gato"},
            descricao:
                "Pelagem curta, normalmente em cores pretas e cinzas. Cor preta predominante nas patas e cara",
        },
        {
            id: uuid(),
            breed_name: "Ashera",
            specie: {id: "9515acf2-2774-4760-adf3-012ca8abf2e5", name: "Gato"},
            descricao:
                "Porte grande, pelagem curta, muito similar a um felino selvagem",
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
            dataIndex: "breed_name",
            key: "breed_name",
        },
        {
            title: "Especie",
            dataIndex: "specie",
            key: "specie",
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

    useEffect(() => {
        // handleGetBreeds(token)
        //eslint-disable-next-line
    }, [token])

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
                {action === "ADD" ? <AddBreedForm /> : action === "EDIT" ? <EditBreedForm /> : <ConfirmRemoveText />}
            </Modal>
        </Layout>
    );
}
