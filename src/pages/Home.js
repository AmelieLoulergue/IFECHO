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
  const mapboxApiKey = 'pk.eyJ1IjoiYW1lbGllbG91bGVyZ3VlIiwiYSI6ImNrdDhoanZ3NjEyZGkyb3BlZ3oxMTBmeHEifQ.ir5tEud5r6CmrJUyTuG-yw'
  const weatherApiKey = '405a5e5a09ef7c29d5e73a4f4047ddf2'
  const onSelected = (result) => {
    console.log("selected", result.longitude, result.latitude)
    context.searchCoordinates = [result.longitude, result.latitude]
    console.log(context)
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[1]}&lon=${context.searchCoordinates[0]}&APPID=${weatherApiKey}`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&APPID=${weatherApiKey}`)
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
    <div>
      Où se situe votre exploitation ? 
      <Geocoder                
          mapboxApiAccessToken={mapboxApiKey}                
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
    </div>
  )
}

export default Home
