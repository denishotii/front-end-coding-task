import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
interface Props{
    chartData:any
}
function LineChart({ chartData }:Props) {
  return <Line data={chartData}  />;
}

export default LineChart;