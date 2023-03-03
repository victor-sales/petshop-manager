import { Table } from "antd";
import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useDashboardContext from "../../hooks/useDashboardContext";
import DashboardTitle from "../Dashboard/DashboardTitle";

export default function LastSells (props) {

	const { token } = useAuthContext()
	const { handleGetLastSells, lastSells, loadingLastSells } = useDashboardContext()

    const columns = [
		{
			title: 'Vendedor',
			dataIndex: ['cashier', 'name'],
			key: 'cashier',
		},
		{
			title: 'Produto',
			dataIndex: ['product', 'name'],
			key: 'product',
		},
		{
			title: 'Quantidade',
			dataIndex: 'amount',
			key: 'amount',
		}
		
	];

	const getChart = async () => await handleGetLastSells(token)
	
	useEffect(() => {
		if (token) getChart()
		//eslint-disable-next-line
	}, [token])

	useEffect(() => {
		const button = document.getElementById("last-sells")
		if (button) button.addEventListener("click", getChart)

		return () => {
			const button = document.getElementById("last-sells")
			if (button) button.removeEventListener("click", getChart)
		}
		//eslint-disable-next-line
	}, [token])
      
    return (
        <div className='border rounded-md bg-white flex flex-col border-gray-400 shadow-sm'>
            <DashboardTitle id={"last-sells"} title="Últimas Vendas" loading={loadingLastSells}/>
            <div className="border border-gray-400 m-2 h-full">
                <Table 
					id="table-last-sells"
					pagination={false} 
					size="small" 
					dataSource={lastSells} 
					columns={columns}
					loading={loadingLastSells} />
            </div>
        </div>
    )
}