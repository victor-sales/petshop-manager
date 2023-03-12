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
import DivActionButtons from '../components/Table/DivActionButtons';
import AntdModal from '../components/AntdModal';
import { UserActions } from '../utils/Enums';
import RemoveSpecieForm from '../components/Form/Forms/Species/RemoveSpecieForm';


export default function Especies(props) {
    const { token } = useAuthContext()
    const { handleGetSpecies, species, loadingCreateSpecie, loadingSpecies, loadingUpdateSpecie, loadingDeleteSpecie, speciesMessage, setSpeciesMessage, speciesMessageType, setSpeciesMessageType } = useSpeciesContext()

    const [specie, setSpecie] = useState({})
    const [visible, setVisible] = useState(false);    
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")


    async function listSpecies () {
        await handleGetSpecies(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (specie) => {
        setSpecie(specie)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (specie) => {
        setSpecie(specie)
        setAction(UserActions.DELETE); 
        setVisible(true)
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "specie_name",
            key: "specie_name",
            sorter: (a, b) => a.specie_name.localeCompare(b.specie_name)
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
                        <button onClick={(e) => onClickDelete(record)}>
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
        switch (action) {
            case UserActions.ADD:
                setModalTitle("Adicionar espécie")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar espécie")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover espécie")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listSpecies()
        //eslint-disable-next-line
    }, [token])
    

    return (
    <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons onClickNew={onClickNew} onClickUpdate={listSpecies}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={species.sort((a, b) => a.specie_name.localeCompare(b.specie_name))}
                                loading={loadingSpecies}
                                columns={columns} 
                                scroll={{x: true}}
                                pagination={{}}/>
                        </div>
                    </div>
                </Container>
            </Layout>

            <AntdModal 
                visible={visible} 
                setVisible={setVisible} 
                id={"specie-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateSpecie : action === UserActions.EDIT ? loadingUpdateSpecie : loadingDeleteSpecie} 
                centered={action === UserActions.DELETE}
                message={speciesMessage}
                setMessage={setSpeciesMessage}
                messageType={speciesMessageType}
                setMessageType={setSpeciesMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddSpecieForm /> : 
                    action === UserActions.EDIT ? 
                        <EditSpecieForm specie={specie} setSpecie={setSpecie}/> : 
                        <RemoveSpecieForm specie={specie} />
                }
            </AntdModal>
            </>

    );
}
