import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder';
import {useContext, useState} from 'react'
import GlobalContext from '../context/GlobalContext';
import ReactSpeedometer from "react-d3-speedometer"
import classes from "./Home.module.css"
function Home() {
  const context = useContext(GlobalContext)
  const [thi, setThi]= useState("")
  const [temp, setTemp]= useState("")
  const [humidity, setHumidity]= useState("")
  const [date, setDate]= useState("")
  const [hourlyForecastWeather48h, setHourlyForecastWeather48h]= useState("")
  const [thiForecastWeather48h, setThiHourlyForecastWeather48h]= useState([])
  const MyInput = (props) => <input {...props} placeholder="Où se situe votre exploitation ?" />


  const onSelected = (result) => {
    context.searchCoordinates = [result.latitude, result.longitude]
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&APPID=${process.env.REACT_APP_WEATHER}`)
    .then(response => response.json())
    .then(response => { 
      setTemp(response.main.temp)
      setHumidity(response.main.humidity)
      calculTHI()
    })
    console.log(context.searchCoordinates[0],context.searchCoordinates[1] )
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&APPID=${process.env.REACT_APP_WEATHER}`)
    .then(response => response.json())
    .then(res =>{ 
      console.log(res)
      setHourlyForecastWeather48h(res.hourly)
    })
  }
  const calculTHI = (datasTemp ="", datasHumidity="") => {
      setThi((1.8*temp/100) + (humidity/100) * (temp/100 - 14.4) +46.4)
   }
   
  const handleSubmit = e => {
      e.preventDefault()
      let n = 0
      let forecast12h = []
      let forecast24h = []
      let forecast48h = []
      hourlyForecastWeather48h.map(
        weather => {
        if(n < 12){
          forecast12h.push((1.8*weather.temp/100) + (weather.humidity/100) * (weather.temp/100 - 14.4) + 46.4)
        }else if(n < 24){
          forecast24h.push((1.8*weather.temp/100) + (weather.humidity/100) * (weather.temp/100 - 14.4) + 46.4)
        }else{
          forecast48h.push((1.8*weather.temp/100) + (weather.humidity/100) * (weather.temp/100 - 14.4) + 46.4)
        }
        n = n + 1 
      })
      const calculAvg = (array) => {
      const sum = array.reduce((a, b) => a + b, 0);
      const avg = (sum / array.length) || 0;
      return avg
      }
      console.log(calculAvg(forecast12h), calculAvg(forecast24h), calculAvg(forecast48h))
      setThiHourlyForecastWeather48h([calculAvg(forecast12h), calculAvg(forecast24h), calculAvg(forecast48h)])
  }
  
  return (
    <main className={classes.home}>
      <div className={classes.jumbotron}>
      <h2>Améliorez le bien-être de vos vaches durant les pics de température !</h2>
      </div>
      <section className={classes.section}>
        <h2>Analysez l'indice THI de votre exploitation</h2>

      <Geocoder                
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}                
          onSelected={onSelected}   
          className={classes.geocoder}             
          hideOnSelect={true}                
          value=""  
          params={{country: "fr"}} 
          viewport={{}}
          inputComponent={MyInput}
          />  
      
      {context.searchCoordinates ? 
      <>
      <div className="col-6">
          <h3>Charge Thermique Max : </h3>
          <h1>0</h1>
        </div>
      <h3>THI :</h3>
      <div className="row">
        <div className="col-6">
          <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thi}/>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Prévisions</button>
       </form>
      </>
      :
      false }
      {thiForecastWeather48h.length !== 0 ? 
    <> 
      <div className="col-6">
        <div className="row">
            <div className="col-4">
              <h3>Dans 12h - charge thermique max : </h3>
              <h1>0</h1>
              <h3>THI :</h3>
              <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thiForecastWeather48h[0].toFixed(1)}/>
            </div>
            <div className="col-4">
              <h3>Dans 24h - charge thermique max : </h3>
              <h1>0</h1>
              <h3>THI :</h3>
              <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thiForecastWeather48h[1].toFixed(1)}/>
            </div>
            <div className="col-4">
              <h3>Dans 48h - charge thermique max : </h3>
              <h1>0</h1>
              <h3>THI :</h3>
              <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thiForecastWeather48h[2].toFixed(1)}/>
            </div>
          </div>
        </div>
    </> : false   
    }
      </section>
    </main>
  )
}

export default Home
