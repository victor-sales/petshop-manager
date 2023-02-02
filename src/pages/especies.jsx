import { v4 as uuid } from 'uuid';
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddSpecieForm from "../components/Form/Forms/Species/AddSpecieForm";
import EditSpecieForm from "../components/Form/Forms/Species/EditSpecieForm";
import ConfirmRemoveText from "../components/ConfirmRemoveText";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useSpeciesContext from "../hooks/useSpeciesContext";


export default function Especies(props) {
    const { token } = useAuthContext()
    const { handleGetSpecies, species } = useSpeciesContext()

    const [visible, setVisible] = useState(false);    
    const [action, setAction] = useState("")

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "specie_name",
            key: "specie_name",
        },
        {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
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
        handleGetSpecies(token)
        //eslint-disable-next-line
    }, [token])

    return (
        <Layout>
            <Container>
                <div className="w-full flex flex-row-reverse">
                    <IconButton iconName={faPlusCircle} title="Novo" onClick={(e) => { setAction("ADD"); setVisible(true) }}/>
                </div>
                <Table size="small" dataSource={species} columns={columns} />
            </Container>
            <Modal
                key={"new-specie"}
                onOk={() => setVisible(false)}
                okText="Confirmar"
                cancelText="Fechar"
                title="Modal"
                open={visible}
            >
                {action === "ADD" ? <AddSpecieForm /> : action === "EDIT" ? <EditSpecieForm /> : <ConfirmRemoveText />}
            </Modal>
        </Layout>
    );
}
