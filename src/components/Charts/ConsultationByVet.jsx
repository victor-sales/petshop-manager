import { Spin } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect } from 'react';
  import { Bar } from 'react-chartjs-2'
import useAuthContext from '../../hooks/useAuthContext';
import useDashboardContext from '../../hooks/useDashboardContext';
import DashboardTitle from '../Dashboard/DashboardTitle';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
export default function ConsultationByVet (props) {

    const { token } = useAuthContext()
	const { handleGetByVet, byVet, loadingByVet } = useDashboardContext()

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

    const getChart = async () => await handleGetByVet(token)
	
	useEffect(() => {
		if (token) getChart()
		//eslint-disable-next-line
	}, [token])

	useEffect(() => {
		const button = document.getElementById("by-vet")
		if (button) button.addEventListener("click", getChart)

		return () => {
			const button = document.getElementById("by-vet")
			if (button) button.removeEventListener("click", getChart)
		}
		//eslint-disable-next-line
	}, [token])

    return (
        <div className='border rounded-md bg-white flex flex-col border-gray-400 shadow-sm'>
            <DashboardTitle id={"by-vet"} title="Consultas por Veterinário" loading={loadingByVet}/>
            <div className="border border-gray-400 m-2 p-2 h-full">
                {
                    loadingByVet ?
                        <div className='h-full flex justify-center items-center'>
                            <Spin />
                        </div> :
                        <Bar    
                                options={options}
                                datasetIdKey='id'
                                data={{
                                    labels: byVet.filter(e => e._id.vet).map(e => e._id.vet),
                                    datasets: [
                                        {   
                                            id: 1,
                                            label: '',
                                            data: byVet.filter(e => e._id.vet).map(e => e.atendance),
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