import { v4 as uuid } from 'uuid';
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Modal, Table } from "antd";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddBreedForm from "../components/Form/Forms/Breeds/AddBreedForm";
import EditBreedForm from "../components/Form/Forms/Breeds/EditBreedForm";
import ConfirmRemoveText from "../components/ConfirmRemoveText";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useBreedsContext from "../hooks/useBreedsContext";
import DivActionButtons from '../components/Table/DivActionButtons';
import AntdModal from '../components/AntdModal';
import { UserActions } from '../utils/Enums';
import RemoveBreedForm from '../components/Form/Forms/Breeds/RemoveBreedForm';
import { capitalizeFirst } from '../utils/Helpers';


export default function Racas(props) {
    const { token } = useAuthContext()
    const { handleGetBreeds, breeds, loadingCreateBreed, loadingBreeds, loadingUpdateBreed, loadingDeleteBreed, breedsMessage, setBreedsMessage, breedsMessageType, setBreedsMessageType } = useBreedsContext()

    const [breed, setBreed] = useState({})
    const [visible, setVisible] = useState(false);    
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")


    async function listBreeds () {
        await handleGetBreeds(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (breed) => {
        setBreed(breed)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (breed) => {
        setBreed(breed)
        setAction(UserActions.DELETE); 
        setVisible(true)
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "breed_name",
            key: "breed_name",
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
                setModalTitle("Adicionar raça")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar raça")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover raça")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listBreeds()
        //eslint-disable-next-line
    }, [token])
    

    return (
    <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons onClickNew={onClickNew} onClickUpdate={listBreeds}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={breeds.sort((a, b) => a.breed_name.localeCompare(b.breed_name))}
                                loading={loadingBreeds}
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
                id={"breed-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateBreed : action === UserActions.EDIT ? loadingUpdateBreed : loadingDeleteBreed} 
                centered={action === UserActions.DELETE}
                message={breedsMessage}
                setMessage={setBreedsMessage}
                messageType={breedsMessageType}
                setMessageType={setBreedsMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddBreedForm /> : 
                    action === UserActions.EDIT ? 
                        <EditBreedForm breed={breed} setBreed={setBreed}/> : 
                        <RemoveBreedForm breed={breed} />
                }
            </AntdModal>
            </>

    );
}
