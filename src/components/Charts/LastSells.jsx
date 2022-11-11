import { Table } from "antd";

export default function LastSells (props) {
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
          
          cashier: "Paulo Ricardo",
          buyer_name: "Maria Paula",
          buyer_email: "maria.paula@email.com",
          item: "Arranhador",
          amount: "1",
        },
        
      ];

      const columns = [
        {
          title: 'Vendedor',
          dataIndex: 'cashier',
          key: 'cashier',
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
        }
        
      ];
      
    return (
        <div className='border rounded-md bg-white p-2 flex flex-col'>
            <span className="text-[12px] font-bold text-gray-500 self-center mb-2">Últimas Vendas</span>
            <div className="border border-gray-200 rounded-md">
                <Table size="small" dataSource={dataSource} columns={columns} />
            </div>
            </div>
    )
}