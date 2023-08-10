import 'chart.js/auto';
import { Line  } from 'react-chartjs-2';
import { Col } from '@nextui-org/react';

export default function LineChart (prop) {

    const data = {
        labels:prop.subtitles,
        datasets: [
            {
                label: prop.title,
                data: prop.statistics,
                borderColor: prop.colors,
                backgroundColor: prop.colors,
                fill: true,
                tension: 0.5,
            },
            {
                label: prop.title1,
                data: prop.statistics1,
                borderColor: prop.colors1,
                backgroundColor: prop.colors1,
                fill: true,
                tension: 0.5,
            }
        ],
      };

      const options = {
        legend: {
            labels: {
              color: 'white',
            },
          },
        scales: {
          x: {
            ticks: {
              color: 'white', 
            },
          },
          y: {
            ticks: {
              color: 'white', 
            },
          },
        },
      };
      

    return (
        <Col css={{ height:'17rem'}}>
        <Line  data={data} options={options} />
        </Col>
    );
}