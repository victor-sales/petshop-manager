
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

  import { Pie} from 'react-chartjs-2'
ChartJS.register(
    ArcElement, Tooltip, Legend
  );
export default function ScheduledServices (props) {
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: 'Serviços Agendados x Serviços Confirmados',
        },
  },
    }

    return (
        <div className='border rounded-md bg-white p-2'>
            <Pie    
                options={options}
                datasetIdKey='id'
                data={{
                    labels: ['Serviços ', 'Serviços Confirmados'],
                    datasets: [
                      {
                        label: '# of Votes',
                        data: [3, 2],
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
        </div>
        
    )
}