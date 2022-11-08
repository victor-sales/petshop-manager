import Container from "../components/Container"
import Layout from "../components/Layout"
import { Table } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function produtos (props) {
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