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

  const MyInput = (props) => <input {...props} placeholder="Où se situe votre exploitation ?" />

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
      <h3>THI :</h3>
      <ReactSpeedometer minValue={0} maxValue={100} segmentColors={['#3FBF50', '#7FC211', '#F2E311', '#F57710', '#C40D00']} value={thi}/>
      </>
      :
      false }
      </section>
    </main>
  )
}

export default Home
