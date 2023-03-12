import Container from "../components/Container";
import Layout from "../components/Layout";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useServicesContext from "../hooks/useServicesContext";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { capitalizeFirst } from "../utils/Helpers";
import { UserActions } from "../utils/Enums";
import AntdModal from '../components/AntdModal';
import DivActionButtons from '../components/Table/DivActionButtons';
import AddServiceForm from "../components/Form/Forms/Services/AddServiceForm";
import EditServiceForm from "../components/Form/Forms/Services/EditServiceForm";
import RemoveServiceForm from "../components/Form/Forms/Services/RemoveServiceForm";
import { format } from "date-fns";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import useUserAccountContext from "../hooks/useUserAccountContext";

export default function Servicos(props) {

    const { isAdmin } = useUserAccountContext()
    const { token } = useAuthContext()
    const { handleGetServices, services, loadingCreateService, loadingServices, loadingUpdateService, loadingDeleteService, serviceMessage, setServiceMessage, serviceMessageType, setServiceMessageType, exportServices } = useServicesContext()

    const [service, setService] = useState({})
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    async function listServices () {
        await handleGetServices(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (service) => {
        setService(service)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (service) => {
        setService(service)
        setAction(UserActions.DELETE); 
        setVisible(true)
    }

    const columns = [
        {
            title: "Serviço",
            dataIndex: "service_name",
            key: "service_name",
            render: (name) => capitalizeFirst(name),
            sorter: (a, b) => a.service_name.localeCompare(b.service_name)
        },
        {
            title: "Tutor",
            dataIndex: ["tutor", "name"],
            key: "tutor",
            sorter: (a, b) => a.tutor.name.localeCompare(b.tutor.name)
        },
        {
            title: "Data/Hora",
            dataIndex: "date",
            key: "date",
            render: (date) => format(new Date(date), 'dd/MM/yyyy HH:mm'),
            sorter: (a, b) => new Date(a.date) - new Date(b.date)

        },
        {
            title: "Raça",
            dataIndex: ["breed", "name"],
            key: "breed",
            render: (breed) => capitalizeFirst(breed),
            sorter: (a, b) => a.breed.name.localeCompare(b.breed.name)

        },
        {
            title: "Espécies",
            dataIndex: ["specie", "name"],
            key: "specie",
            render: (specie) => capitalizeFirst(specie),
            sorter: (a, b) => a.specie.name.localeCompare(b.specie.name)

        },
        {
            title: "Descrição",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Sintomas",
            dataIndex: "simptoms",
            key: "simptoms",
        },
        {
            title: "Confirmado",
            dataIndex: "is_confirmed",
            key: "is_confirmed",
            render: (confirmed) => confirmed ? "SIM" : "NÃO",
            sorter: (a, b) => a.is_confirmed - b.is_confirmed

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
                setModalTitle("Adicionar serviço")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar serviço")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover serviço")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listServices()
        //eslint-disable-next-line
    }, [token])
    
    return (
        <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons 
                            onClickNew={onClickNew} 
                            onClickUpdate={listServices}
                            extra={isAdmin ? <IconButton id={"export"} iconName={faFileCsv} title="Exportar" onClick={exportServices}/> : <></>}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={services.sort((a, b) => a.date - b.date)}
                                loading={loadingServices}
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
                id={"service-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateService : action === UserActions.EDIT ? loadingUpdateService : loadingDeleteService} 
                centered={action === UserActions.DELETE}
                message={serviceMessage}
                setMessage={setServiceMessage}
                messageType={serviceMessageType}
                setMessageType={setServiceMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddServiceForm /> : 
                    action === UserActions.EDIT ? 
                        <EditServiceForm service={service} setService={setService}/> : 
                        <RemoveServiceForm service={service} />
                }
            </AntdModal>
            </>

        );
}
