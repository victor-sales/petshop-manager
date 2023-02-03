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
import { APIMethods, UserActions } from "../utils/Enums";
import AntdModal from '../components/AntdModal';
import DivActionButtons from '../components/Table/DivActionButtons';
import RemoveAnimalForm from '../components/Form/Forms/Animals/RemoveAnimalForm';

export default function Animais(props) {

    const { token } = useAuthContext()
    const { handleGetAnimals, animals, loadingCreateAnimal, loadingAnimals, loadingUpdateAnimal, loadingDeleteAnimal, animalMessage, setAnimalMessage, animalMessageType, setAnimalMessageType } = useAnimalsContext()

    const [animal, setAnimal] = useState({})
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    async function listAnimals () {
        await handleGetAnimals(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (animal) => {
        setAnimal(animal)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (animal) => {
        setAnimal(animal)
        setAction(UserActions.DELETE); 
        setVisible(true)
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
                setModalTitle("Adicionar animal")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar animal")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover animal")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listAnimals()
        //eslint-disable-next-line
    }, [token])
    
    return (
        <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons onClickNew={onClickNew} onClickUpdate={listAnimals}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={animals.sort((a, b) => a.tutor.name.localeCompare(b.tutor.name))}
                                loading={loadingAnimals}
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
                id={"animal-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateAnimal : action === UserActions.EDIT ? loadingUpdateAnimal : loadingDeleteAnimal} 
                centered={action === UserActions.DELETE}
                message={animalMessage}
                setMessage={setAnimalMessage}
                messageType={animalMessageType}
                setMessageType={setAnimalMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddAnimalForm /> : 
                    action === UserActions.EDIT ? 
                        <EditAnimalForm animal={animal} setAnimal={setAnimal}/> : 
                        <RemoveAnimalForm animal={animal} />
                }
            </AntdModal>
            </>

        );
}
