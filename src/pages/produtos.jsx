import { v4 as uuid } from 'uuid';
import Container from "../components/Container";
import Layout from "../components/Layout";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditProductForm from "../components/Form/Forms/Products/EditProductForm";
import AddProductForm from "../components/Form/Forms/Products/AddProductForm";
import useProductsContext from "../hooks/useProductsContext";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { capitalizeFirst } from "../utils/Helpers";
import { UserActions, UserProfiles } from "../utils/Enums";
import AntdModal from '../components/AntdModal';
import DivActionButtons from '../components/Table/DivActionButtons';
import RemoveProductForm from '../components/Form/Forms/Products/RemoveProductForm';
import useUserAccountContext from '../hooks/useUserAccountContext';
import IconButton from '../components/Form/FormInputs/Buttons/IconButton';

export default function Produtos(props) {

    const { isAdmin } = useUserAccountContext()
    const { token } = useAuthContext()

    const { handleGetProducts, products, loadingCreateProduct, loadingProducts, loadingUpdateProduct, loadingDeleteProduct, productMessage, setProductMessage, productMessageType, setProductMessageType, exportProducts } = useProductsContext()

    const [product, setProduct] = useState({})
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")
    const [modalTitle, setModalTitle] = useState("")

    async function listProducts () {
        await handleGetProducts(token)
    }

    const onClickNew = () => {
        setAction(UserActions.ADD)
        setVisible(true)
    }

    const onClickEdit = (product) => {
        setProduct(product)
        setAction(UserActions.EDIT)
        setVisible(true)
    }   

    const onClickDelete = (product) => {
        setProduct(product)
        setAction(UserActions.DELETE); 
        setVisible(true)
    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "product_name",
            key: "product_name",
            sorter: (a, b) => a.product_name.localeCompare(b.product_name)
        },
        {
            title: "Marca",
            dataIndex: "brand",
            key: "brand",
            render: (brand) => capitalizeFirst(brand),
            sorter: (a, b) => a.brand.localeCompare(b.brand)
        },
        {
            title: "Tipo",
            dataIndex: "type",
            key: "type",
            render: (type) => capitalizeFirst(type),
            sorter: (a, b) => a.type.localeCompare(b.type)
        },
        {
            title: "Preço",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price.localeCompare(b.price)
        },
        {
            title: "Quantidade",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount
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
                        {isAdmin ?
                            <button onClick={(e) => onClickDelete(record)}>
                                <FontAwesomeIcon
                                    className="h-4 w-4 text-red-600"
                                    icon={faTrash}
                                />
                            </button> :
                            <></>
                        }
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        switch (action) {
            case UserActions.ADD:
                setModalTitle("Adicionar Produto")
                break;
            case UserActions.EDIT:
                setModalTitle("Editar Produto")
                break;
            case UserActions.DELETE:
                setModalTitle("Remover Produto")
                break;
            default:
                break;
        }
    }, [action])

    useEffect(() => {
        if (token) listProducts()
        //eslint-disable-next-line
    }, [token])
    
    return (
        <>
            <Layout>
                <Container>
                    <div className="flex flex-col w-full">
                        <DivActionButtons 
                            onClickNew={onClickNew} 
                            onClickUpdate={listProducts}
                            extra={isAdmin ? <IconButton id={"export"} iconName={faFileCsv} title="Exportar" onClick={exportProducts}/> : <></>}/>
                        <div className="w-full border border-gray-300">
                            <Table
                                size="small" 
                                dataSource={products.sort((a, b) => a.product_name.localeCompare(b.product_name))}
                                loading={loadingProducts}
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
                id={"product-modal"} 
                title={modalTitle} 
                loading={ action === UserActions.ADD ? loadingCreateProduct : action === UserActions.EDIT ? loadingUpdateProduct : loadingDeleteProduct} 
                centered={action === UserActions.DELETE}
                message={productMessage}
                setMessage={setProductMessage}
                messageType={productMessageType}
                setMessageType={setProductMessageType}>
                { 
                    action === UserActions.ADD ? 
                        <AddProductForm /> : 
                    action === UserActions.EDIT ? 
                        <EditProductForm product={product} setProduct={setProduct}/> : 
                        <RemoveProductForm product={product} />
                }
            </AntdModal>
            </>

        );
}
