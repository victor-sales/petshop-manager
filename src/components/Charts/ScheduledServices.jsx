
import { Spin } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Pie} from 'react-chartjs-2'
import useAuthContext from '../../hooks/useAuthContext';
import useDashboardContext from '../../hooks/useDashboardContext';
import DashboardTitle from '../Dashboard/DashboardTitle';
ChartJS.register(
    ArcElement, Tooltip, Legend
  );
export default function ScheduledServices (props) {

    const { token } = useAuthContext()
	const { handleGetScheduleVsConfirmed, scheduleVsConfirmed, loadingScheduleVsConfirmed } = useDashboardContext()
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            },
        },
    }

    const getChart = async () => await handleGetScheduleVsConfirmed(token)
	
	useEffect(() => {
		if (token) getChart()
		//eslint-disable-next-line
	}, [token])

    useEffect(() => {
		const button = document.getElementById("not-vs-confirmed")
		if (button) button.addEventListener("click", getChart)

		return () => {
			const button = document.getElementById("not-vs-confirmed")
			if (button) button.removeEventListener("click", getChart)
		}
		//eslint-disable-next-line
	}, [token])

    return (
        <div className='border rounded-md bg-white flex flex-col border-gray-400 shadow-sm'>
            <DashboardTitle id={"not-vs-confirmed"} title="Não Confirmados x Confirmados" loading={loadingScheduleVsConfirmed}/>
            <div className="border border-gray-400 m-2 p-2 h-full">
                {
                    loadingScheduleVsConfirmed ?
                        <div className='h-full flex justify-center items-center'>
                            <Spin />
                        </div> :
                        <Pie    
                            options={options}
                            datasetIdKey='id'
                            data={{
                                labels: ['Serviços Não Confirmados ', 'Serviços Confirmados'],
                                datasets: [
                                {
                                    label: 'Serviços',
                                    data: Object.values(scheduleVsConfirmed),
                                    backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    
                                    ],
                                    borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    
                                    ],
                                    borderWidth: 1,
                                },
                            ]}}
                        />
                    }
            </div>
        </div>
        
    )
}