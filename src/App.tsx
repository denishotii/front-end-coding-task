import React, { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./components/LineCharts";
import SLineChart from "./components/SLineChart";

function App() {
  // Initializing state for chart data 
  const [data, setData] = useState({
    datasets: [
      {
        label: "TVL",
        data: [],
        fill: true,
        responsive:true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
    labels: [],
  });

  useEffect(() => {
    //Request call for given API
    fetch(
      `https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000`
    )
      .then((data) => {
        const res = data.json();
        return res;
      })
      .then((res) => {
        console.log("res", res.data);
        //Initialize empty array for chart labels and chart data
        const label: any = [];
        const data: any = [];
        //Filter data by asset name
        const filtered = res.data.filter((obj: any) => {
          return obj.asset === "USDC-WETH";
        });
        //Getting data for chart for HODLPrice7dHistorical field
        Object.values(filtered[0].HODLPrice7dHistorical).map((key: any) => {
          //Filling initialized arrays for chart with API data
          const date = key.date;
          const formated = new Date(date).toLocaleDateString('en-us', { year:"numeric", month:"short"});
          label.push(formated);
          data.push(key.value);
        });
        setData({
          datasets: [
            {
              label: "TVL",
              data: data,
              fill: true,
              lineTension: 0.1,
              responsive:true,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
            },
          ],
          labels: label,
        });
        console.log(label);
        console.log(data);
      });
  }, []);
  

  return (<div className="app">
    <h1 style={{textAlign:"center", color:"white"}}>Chart Example</h1>
    <div className="App">
      <div className="firstChart">
        <LineChart chartData={data} />
      </div>
        <SLineChart />
    </div>
  </div>);
}
export default App;
