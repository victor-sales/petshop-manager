
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
  import { Line, Chart, Bar} from 'react-chartjs-2'
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
export default function SellsByMonth (props) {
    
    const options = {
        responsive: true,

    plugins: {
        legend: {
        position: 'top',
        },
        
        title: {
        display: true,
        text: 'Vendas por Mês',
        },
        
  },
    }

    return (
        <div className='border rounded-md bg-white p-2'>
            <Bar    
                options={options}
                datasetIdKey='id'
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: [1,2,4,5,5, 6, 7, 2, 2,3,6,7],
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                }}
            />
        </div>
        
    )
}