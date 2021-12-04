import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';

function Breeder() {
  const [dateThi, setDateThi] = useState("")
  const [future_ct, setFuture_ct] = useState("")
  const [future_thi, setFuture_thi] = useState("")
  const [historical_ct, setHistorical_ct] = useState("")
  const [historical_thi, setHistorical_thi] = useState("")

  const getDatas = async () => {
      const res = await fetch("http://localhost:3000/sitesdate/1", {
        body: JSON.stringify({date:dateThi}),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      const data = await res.json()
      console.log(data.future_ct)
      setFuture_ct(data.future_ct)
      setFuture_thi(data.future_thi)
      setHistorical_ct(data.historical_ct)
      setHistorical_thi(data.historical_thi)
  }
  useEffect(() => getDatas(), [dateThi])
  const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Historical THI',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: historical_thi
      },
      {
        label: 'Historical CT',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,75,1)',
        borderColor: 'rgba(75,192,75,1)',
        borderWidth: 2,
        data: historical_ct
      },
      {
        label: 'Future THI',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(255, 99, 71)',
        borderColor: 'rgb(255, 99, 71)',
        borderWidth: 2,
        data: future_thi
      },
      {
        label: 'Future CT',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(40,40,40,1)',
        borderColor: 'rgba(40,40,40,1)',
        borderWidth: 2,
        data: future_ct
      }
  
    ]
  }
  return (
    <div>
      <div>
        <input type="date" onChange={(e) => setDateThi(e.target.value)} />
      </div>
      BREEDER
      <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      {future_ct}<br/>
      {future_thi}<br/>
      {historical_ct}<br/>
      {historical_thi}
    </div>
  )
}

export default Breeder
