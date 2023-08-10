import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Col } from '@nextui-org/react';
export default function DoughnutChart (prop) {

    const data = {
        labels:prop.subtitles,
        datasets: [{
          label: prop.title,
          data: prop.statistics,
          backgroundColor: prop.colors,
          hoverOffset: 4
        }]
      };

      const options = {
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      };

    return (
        <Col css={{ height:'16rem'}}>
            <Chart type='doughnut' data={data} options={options}/>
        </Col>
    );
}