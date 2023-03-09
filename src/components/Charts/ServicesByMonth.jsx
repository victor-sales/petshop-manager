
import { Spin } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  } from 'chart.js';
import { useEffect, useState } from 'react';
  import { Line, Chart, Bar} from 'react-chartjs-2'
import useAuthContext from '../../hooks/useAuthContext';
import useDashboardContext from '../../hooks/useDashboardContext';
import DashboardTitle from '../Dashboard/DashboardTitle';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );
export default function ServicesByMonth (props) {

    const { token } = useAuthContext()
    const { handleGetServicesByMonth, servicesByMonth, loadingServicesByMonth } = useDashboardContext()

    const [data, setData] = useState([])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        scale: {
            y: {
                type: 'linear',
                ticks: {
                    stepSize: 1,
                },
            },
          }
    }

    const months = [
        { number: 1, name: "Jan" },
        { number: 2, name: "Fev" },
        { number: 3, name: "Mar" },
        { number: 4, name: "Abr" },
        { number: 5, name: "Mai" },
        { number: 6, name: "Jun" },
        { number: 7, name: "Jul" },
        { number: 8, name: "Ago" },
        { number: 9, name: "Set" },
        { number: 10, name: "Out" },
        { number: 11, name: "Nov" },
        { number: 12, name: "Dez" },
    ]

    function handleData () {
        
        let services = []
        const data = servicesByMonth.map(e => ({month: e._id.month , services: e.services}))

        months.forEach(month => {
            if (data.every(e => month.number !== e.month)) {
                services.push({ month: month.number, services: 0 })
            } 
        })

        services = [...services, ...data].sort((a, b) => a.month - b.month).map(e => e.services)
        
        setData(services)
    }

    const getChart = async () => await handleGetServicesByMonth(token)
	
	useEffect(() => {
		if (token) getChart()
		//eslint-disable-next-line
	}, [token])

    useEffect(() => {
		const button = document.getElementById("services-by-month")
		if (button) button.addEventListener("click", getChart)

		return () => {
			const button = document.getElementById("services-by-month")
			if (button) button.removeEventListener("click", getChart)
		}
		//eslint-disable-next-line
	}, [token])

    useEffect(() => {
        if (servicesByMonth.length) handleData()
        //eslint-disable-next-line
    }, [servicesByMonth])

    return (
        <div className='border rounded-md bg-white flex flex-col border-gray-400 shadow-sm'>
            <DashboardTitle id={"services-by-month"} title="Serviços por Mês" loading={loadingServicesByMonth}/>
            <div className="border border-gray-400 m-2 p-2 h-full">
            {
                loadingServicesByMonth ?
                    <div className='h-full flex justify-center items-center'>
                        <Spin />
                    </div> :
                        <Bar    
                            options={options}
                            datasetIdKey='id'
                            data={{
                                labels: months.sort((a, b) => a.number - b.number).map(e => e.name),
                                datasets: [
                                    {
                                        id: 1,
                                        label: '',
                                        data: data,
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                        }}
                />
            }
            </div>
        </div>
        
    )
}