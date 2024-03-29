import Container from "../components/Container";
import Layout from "../components/Layout";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddUserForm from "../components/Form/Forms/Users/AddUserForm";
import EditUserForm from "../components/Form/Forms/Users/EditUserForm";
import useUsersContext from "../hooks/useUsersContext"
import useAuthContext from "../hooks/useAuthContext";
import DivActionButtons from '../components/Table/DivActionButtons';
import { UserActions } from '../utils/Enums';
import AntdModal from '../components/AntdModal';
import { capitalizeFirst } from '../utils/Helpers';
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import useUserAccountContext from "../hooks/useUserAccountContext";

export default function Usuarios(props) {
    
    const { isAdmin } = useUserAccountContext()
    const { handleGetUsers, loadingUsers, loadingCreateUser, loadingUpdateUser, userMessage, setUserMessage, userMessageType, setUserMessageType, exportUsers } = useUsersContext()
    const { token } = useAuthContext()

    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [users, setUsers] = useState([])
    const [modalTitle, setModalTitle] = useState("")

    const [user, setUser] = useState({})

    async function listUsers () {
        const arr = await handleGetUsers(token)

        if (arr) setUsers(arr)
        else setUsers([])
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (record) => {
        setUser(record)
        setAction(UserActions.EDIT)
        setVisible(true)
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "user_name",
            key: "user_name",
            sorter: (a, b) => a.user_name.localeCompare(b.user_name)
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: "Telefone",
            dataIndex: "phone_number",
            key: "phone_number",
            render: (phone) => phone ? phone : "-",
            sorter: (a, b) => a.phone.localeCompare(b.phone)
        },
        {
            title: "Perfil",
            dataIndex: "profile",
            key: "profile",
            render: (profile) => capitalizeFirst(profile),
            sorter: (a, b) => a.profile.localeCompare(b.profile)
        },
        {
            title: "Função",
            dataIndex: "role",
            key: "role",
            render: (role) => capitalizeFirst(role),
            sorter: (a, b) => a.role.localeCompare(b.role)
        },
        {
            title: "Ações",
            key: "actions",
            render: (record) => {
                return (
                    <>
                        {
                            isAdmin ?
                                <div className="flex flex-row gap-3">
                                    <button onClick={(e) => onClickEdit(record)}>
                                        <FontAwesomeIcon
                                            className="h-4 w-4 text-blue-600"
                                            icon={faPencil}
                                        />
                                    </button>
                                </div> :
                                <></>
                        }
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        switch (action) {
            case UserActions.ADD:
                setModalTitle("Adicionar usuário")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar usuário")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listUsers()
        //eslint-disable-next-line
    }, [token])

    return (
        <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons 
                            onClickNew={onClickNew} 
                            onClickUpdate={listUsers}
                            extra={isAdmin ? <IconButton id={"export"} iconName={faFileCsv} title="Exportar" onClick={exportUsers}/> : <></>}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={users.sort((a, b) => a.user_name.localeCompare(b.user_name))}
                                loading={loadingUsers}
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
                id={"add-user"} 
                title={modalTitle} 
                loading={ action=== UserActions.ADD ? loadingCreateUser : action=== UserActions.EDIT ? loadingUpdateUser : false} 
                message={userMessage}
                setMessage={setUserMessage}
                messageType={userMessageType}
                setMessageType={setUserMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddUserForm users={users} setUsers={setUsers} /> : 
                    action === UserActions.EDIT ? 
                        <EditUserForm users={users} setUsers={setUsers} user={user} setUser={setUser}/> : 
                        <></>
                }
            </AntdModal>
        </>
        
    );
}
