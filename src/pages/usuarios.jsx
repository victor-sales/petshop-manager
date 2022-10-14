import Container from "../components/Container"
import Layout from "../components/Layout"
import { Table } from "antd"

export default function Usuarios (props) {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address1: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '3',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '4',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '5',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '6',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '7',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '8',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '9',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
        {
          key: '10',
          name: 'John',
          age: 42,
          address1: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address1',
          key: 'address',
        },
        {
          title: 'Address',
          dataIndex: 'address2',
          key: 'address',
        },
        {
          title: 'Address',
          dataIndex: 'address3',
          key: 'address',
        },
        {
          title: 'Address',
          dataIndex: 'address4',
          key: 'address',
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