import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Col } from '@nextui-org/react';
export default function BarChart (prop) {

    const data = {
        labels:prop.subtitles,
        datasets: [{
          label: prop.title,
          data: prop.statistics,
          backgroundColor: prop.colors,
          borderWidth: 1

        }],
      };

const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff", 
        },
      },
    },
  };

    return (
        <Col css={{ height:'17rem'}}>
        <Bar data={data} options={options} />
        </Col>
    );
}