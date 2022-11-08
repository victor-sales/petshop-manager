import Container from "../components/Container"
import Layout from "../components/Layout"
import { Table } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function vendas (props) {
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
          dataIndex: 'buyer',
          key: 'buyer',
        },
        {
          title: 'Produto',
          dataIndex: 'product_name',
          key: 'product_name',
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
          render: (data) => {
              return (
                  <div className="flex flex-row gap-3">
                      <button
                          className="disabled:text-gray-400 text-blue-600"
                          onClick={(e) => setVisible(true)}
                      >
                          <FontAwesomeIcon
                              className="h-4 w-4 "
                              icon={faPencil}
                          />
                      </button>
                      <button
                          className="disabled:text-gray-400 text-red-600"
                          onClick={(e) => setVisible(true)}
                      >
                          <FontAwesomeIcon
                              className="h-4 w-4 "
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
                <Table size="small" dataSource={dataSource} columns={columns} />;
            </Container>
        </Layout>
    )
}   