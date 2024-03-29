import Container from "../components/Container";
import Layout from "../components/Layout";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import EditSellForm from "../components/Form/Forms/Sells/EditSellForm";
import AddSellForm from "../components/Form/Forms/Sells/AddSellForm";
import useSellsContext from "../hooks/useSellsContext";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { UserActions } from "../utils/Enums";
import AntdModal from '../components/AntdModal';
import DivActionButtons from '../components/Table/DivActionButtons';
import RemoveSellForm from '../components/Form/Forms/Sells/RemoveSellForm';
import { format } from 'date-fns';
import useUserAccountContext from '../hooks/useUserAccountContext';

export default function Vendas(props) {

    const { token } = useAuthContext()
    const { isAdmin } = useUserAccountContext()
    const { handleGetSells, sells, loadingCreateSell, loadingSells, loadingUpdateSell, loadingDeleteSell, sellMessage, setSellMessage, sellMessageType, setSellMessageType, exportSales } = useSellsContext()

    const [sell, setSell] = useState({})
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    async function listSells () {
        await handleGetSells(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (sell) => {
        setSell(sell)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (sell) => {
        setSell(sell)
        setAction(UserActions.DELETE); 
        setVisible(true)
    }

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => format(new Date(date), "dd/MM/yyyy HH:mm"),
            sorter: (a, b) => new Date(a.date) - new Date(b.date)
        },
        {
            title: "Vendedor",
            dataIndex: ["cashier", "name"],
            key: "cashier",
            sorter: (a, b) => a.cashier.name.localeCompare(b.cashier.name)

        },
        {
            title: "Comprador",
            dataIndex: ["buyer", "name"],
            key: "buyer",
            sorter: (a, b) => a.buyer.name.localeCompare(b.buyer.name)

        },
        {
            title: "Produto",
            dataIndex: ["product", "name"],
            key: "product",
            sorter: (a, b) => a.product.name.localeCompare(b.product.name)

        },
        {
            title: "Quantidade",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount

        },
        {
            title: "Valor da venda",
            dataIndex: "sell_value",
            key: "sell_value",
            render: (sell_value) => `R$ ${sell_value}`,
            sorter: (a, b) => a.sell_value.localeCompare(b.sell_value)

        },
        {
            title: "Observações",
            dataIndex: "observations",
            key: "observations",
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
                                    <button onClick={(e) => onClickDelete(record)}>
                                        <FontAwesomeIcon
                                            className="h-4 w-4 text-red-600"
                                            icon={faTrash}
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
                setModalTitle("Adicionar venda")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar venda")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover venda")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listSells()
        //eslint-disable-next-line
    }, [token])
    
    return (
        <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons 
                            onClickNew={onClickNew} 
                            onClickUpdate={listSells} 
                            extra={isAdmin ? <IconButton id={"export"} iconName={faFileCsv} title="Exportar" onClick={exportSales}/> : <></>}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={sells}
                                loading={loadingSells}
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
                id={"sell-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateSell : action === UserActions.EDIT ? loadingUpdateSell : loadingDeleteSell} 
                centered={action === UserActions.DELETE}
                message={sellMessage}
                setMessage={setSellMessage}
                messageType={sellMessageType}
                setMessageType={setSellMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddSellForm /> : 
                    action === UserActions.EDIT ? 
                        <EditSellForm sell={sell} setSell={setSell}/> : 
                        <RemoveSellForm sell={sell} />
                }
            </AntdModal>
            </>

        );
}
