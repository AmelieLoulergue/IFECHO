import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder';
import {useContext, useState} from 'react'
import GlobalContext from '../context/GlobalContext';
import ReactSpeedometer from "react-d3-speedometer"
function Home() {
  const context = useContext(GlobalContext)
  const [thi, setThi]= useState("")
  const [temp, setTemp]= useState("")
  const [humidity, setHumidity]= useState("")

  const onSelected = (result) => {
    console.log("selected", result.longitude, result.latitude)
    context.searchCoordinates = [result.longitude, result.latitude]
    console.log(context)
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[1]}&lon=${context.searchCoordinates[0]}&APPID=${process.env.REACT_APP_WEATHER}`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&APPID=${process.env.REACT_APP_WEATHER}`)
    .then(response => response.json())
    .then(response => { 
      console.log(response)
      console.log(response.main.temp, response.main.humidity)
      setTemp(response.main.temp)
      setHumidity(response.main.humidity)
      calculTHI()
    })
  }
  const calculTHI = () => {
    setThi((1.8*temp/100) + (humidity/100) * (temp/100 - 14.4) +46.4)
   }

  
  return (
    <main>
      {/* <h1>env: {process.env.REACT_APP_MAPBOX}</h1> */}
      <h3>Où se situe votre exploitation ? </h3>
      <Geocoder                
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}                
          onSelected={onSelected}                
          hideOnSelect={true}                
          value=""  
          params={{country: "fr"}} 
          viewport={{}}  
        />  
      
      {context.searchCoordinates ? 
      <>
      THI : 
      <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thi}/>
      </>
      :
      false }
    </main>
  )
}

export default Home
