import Container from "../components/Container"
import Layout from "../components/Layout"
import { Modal, Table } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmRemoveText from "../components/ConfirmRemoveText";

import { useState } from "react";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import AddProductForm from "../components/Form/Forms/Products/AddProductForm";
import EditProductForm from "../components/Form/Forms/Products/EditProductForm";

export default function Produtos (props) {
  const [visible, setVisible] = useState(false);    
  const [action, setAction] = useState("")

    const dataSource = [
        {
          id: '1',
          product_name: 'Coleira Peitoral',
          product_type: 'Coleira',
          product_brand: 'Coleirinha S.A.',
          amount: '3',
          price: 'R$ 19,99',
        },
        {
          id: '2',
          product_name: 'Petisco Au Au',
          product_type: 'Petisco',
          product_brand: 'Petiscar',
          amount: '20',
          price: 'R$ 5,00',
        },
        {
          id: '3',
          product_name: 'Petisco Miau',
          product_type: "Petisco",
          product_brand: 'Petiscar',
          amount: '15',
          price: 'R$ 5,00',
        },
        {
          id: '4',
          product_name: 'Osso de morder',
          product_type: "Brinquedo",
          product_brand: 'BrinqPet',
          amount: '4',
          price: 'R$ 20,00',
        },
        {
          id: '5',
          product_name: 'Arranhador',
          product_type: 'Brinquedo',
          product_brand: 'BrinqPet',
          amount: '2',
          price: 'R$ 99,00',
        },
        
      ];
      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Marca',
          dataIndex: 'product_brand',
          key: 'product_brand',
        },
        {
          title: 'Tipo',
          dataIndex: 'product_type',
          key: 'product_type',
        },
        {
          title: 'Nome',
          dataIndex: 'product_name',
          key: 'product_name',
        },
        {
          title: 'Preço',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Quantidade',
          dataIndex: 'amount',
          key: 'amount',
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
              {action === "ADD" ? <AddProductForm /> : action === "EDIT" ? <EditProductForm /> : <ConfirmRemoveText />}
          </Modal>
      </Layout>
  );
}   