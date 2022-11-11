import Container from "../components/Container"
import Layout from "../components/Layout"
import { Modal, Table } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconButton from "../components/Form/FormInputs/Buttons/IconButton";
import AddSellForm from "../components/Form/Forms/Sells/AddSellForm";
import EditSellForm from "../components/Form/Forms/Sells/EditSellForm";
import ConfirmRemoveText from "../components/ConfirmRemoveText";


export default function Vendas (props) {
    
  const [visible, setVisible] = useState(false);
    const [action, setAction] = useState("")

    const dataSource = [
        {
          id: '1',
          datetime: '12/10 15:00',
          cashier: "Paulo Ricardo",
          buyer_name: "Maria Paula",
          buyer_email: "maria.paula@email.com",
          item: "Petisco Miau",
          amount: "1",
          observations: "",
        },
        {
          id: '2',
          datetime: '12/10 15:00',
          cashier: "Paulo Ricardo",
          buyer_name: "Maria Paula",
          buyer_email: "maria.paula@email.com",
          item: "Petisco Au Au",
          amount: "3",
          observations: "",
        },
        {
          id: '3',
          datetime: '19/10 16:00',
          cashier: "Paulo Ricardo",
          buyer_name: "Maria Paula",
          buyer_email: "maria.paula@email.com",
          item: "Arranhador",
          amount: "1",
          observations: "",
        },
        
      ];

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Data/Hora',
          dataIndex: 'datetime',
          key: 'datetime',
        },
        {
          title: 'vendedor',
          dataIndex: 'cashier',
          key: 'cashier',
        },
        {
          title: 'comprador',
          dataIndex: 'buyer_email',
          key: 'buyer_email',
        },
        {
          title: 'Produto',
          dataIndex: 'item',
          key: 'item',
        },
        {
          title: 'Quantidade',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Observações',
          dataIndex: 'observations',
          key: 'observations',
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
              {action === "ADD" ? <AddSellForm /> : action === "EDIT" ? <EditSellForm /> : <ConfirmRemoveText />}
          </Modal>
      </Layout>
  );
}   