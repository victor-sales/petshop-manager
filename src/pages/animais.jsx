import { v4 as uuid } from 'uuid';

import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import EditAnimalForm from "../components/Form/Forms/Animals/EditAnimalForm";
import AddAnimalForm from "../components/Form/Forms/Animals/AddAnimalForm";
import ConfirmRemoveText from "../components/ConfirmRemoveText";
import useAnimalsContext from "../hooks/useAnimalsContext";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { capitalizeFirst } from "../utils/Helpers";
import RequestHandler from "../utils/RequestHandler";
import { APIMethods } from "../utils/Enums";

export default function Animais(props) {

    const { handleGetAnimals } = useAnimalsContext()
    const { token } = useAuthContext()


    const [animals, setAnimals] = useState([])
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")

    async function listAnimals () {
        const arr = await handleGetAnimals(token)

        if (arr) setAnimals(arr)
        else setAnimals([])
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "animal_name",
            key: "animal_name",
        },
        {
            title: "Tutor",
            dataIndex: ["tutor", "name"],
            key: "tutor",
        },
        {
            title: "Raça",
            dataIndex: ["breed", "name"],
            key: "breed",
            render: (breed) => capitalizeFirst(breed)
        },
        {
            title: "Espécies",
            dataIndex: ["specie", "name"],
            key: "specie",
            render: (specie) => capitalizeFirst(specie)
        },
        {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Ações",
            key: "actions",
            render: (record) => {
                return (
                    <div className="flex flex-row gap-3">
                        <button onClick={(e) => onClickEdit(record)}>
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

    const createAnimal = async () => {
        const animal = {
            id: "fb9cec8d-804a-49c7-a1fb-23a8b3a881e5",
            // id: uuid(),
            animal_name: "Bolota",
            tutor: {_id: "1", name: "teste"},
            breed: {_id: "1", name: "raça teste"},
            specie: {_id: "1", name: "especie teste"}
        }
        const response = await RequestHandler(token, `/api/animals/${animal.id}`, APIMethods.DELETE, animal)

        console.log(response)
    }

    useEffect(() => {
        if (token) listAnimals()
        //eslint-disable-next-line
    }, [token])

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    {/* <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { setAction("ADD"); setVisible(true) }}/> */}
                    <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => createAnimal()}/>
                </div>
                <Table size="small" dataSource={animals} columns={columns} />
            </Container>
            <Modal
                key={"new-animal"}
                onOk={() => setVisible(false)}
                okText="Confirmar"
                cancelText="Fechar"
                title="Modal"
                open={visible}
            >
                {action === "ADD" ? <AddAnimalForm /> : action === "EDIT" ? <EditAnimalForm /> : <ConfirmRemoveText />}
            </Modal>
        </Layout>
    );
}
