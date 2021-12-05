import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';

function Breeder({dateThi}) {
  // console.log(props)
  // const [dateThi, setDateThi] = useState(props.dateThi)
  const [future_ct, setFuture_ct] = useState("")
  const [historical_ct, setHistorical_ct] = useState("")

  const getDatas = async () => {
      const res = await fetch("https://ifecho-api.herokuapp.com/sitesdate/1", {
        body: JSON.stringify({date:dateThi}),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      const data = await res.json()
      setFuture_ct(data.future_ct)
      setHistorical_ct(data.historical_ct)
  }
  useEffect(() => getDatas(), [dateThi])
  const state = {
    labels: Array.from(Array(242).keys()),
    
    datasets: [
      {
        label: 'Historical CT',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#3BB589',
        borderColor: '#3BB589',
        borderWidth: 4,
        data: historical_ct
      },
      {
        label: 'Future CT',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(40,40,40,1)',
        borderColor: 'rgba(40,40,40,1)',
        borderWidth: 4,
        borderDash: [6,6],
        data: future_ct,
      }
      ,
      {
        label: "Seuil d'alerte",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgb(255,0,0)',
        borderColor: 'rgb(255,0,0)',
        borderWidth: 4,
        data: Array(242).fill(5),
      }
  
    ]
  }
  return (
    <div>
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
            }, 
            scales: {
              y: {
                  suggestedMin: 0,
                  suggestedMax: 20
              }
          },
            elements: {
              point:{
                  radius: 0
              }
          }, 


          }}
        />
    </div>
  )
}

export default Breeder
