import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
export default function ConsultationByVet (props) {
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,

    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Consultas por Veterinário',
        },
  },
    }

    return (
        <div className='border rounded-md bg-white p-2'>
            <Bar    
                options={options}
                datasetIdKey='id'
                data={{
                    labels: ['Veterinário 1', 'Veterinário 2'],
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: [2,7],
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }}
            />
        </div>
        
    )
}