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
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  const MyInput = (props) => <input {...props} placeholder="Où se situe votre exploitation ?" />
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  const onSelected = (result) => {
    context.searchCoordinates = [result.latitude, result.longitude]
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&APPID=${process.env.REACT_APP_WEATHER}`)
    .then(response => response.json())
    .then(response => { 
      setTemp(response.main.temp)
      setHumidity(response.main.humidity)
      calculTHI()
    })
  }
  const calculTHI = () => {
    setThi((1.8*temp/100) + (humidity/100) * (temp/100 - 14.4) +46.4)
   }
   
  const handleSubmit = e => {
    e.preventDefault()
    console.log(Date.now())
    console.log(context.searchCoordinates[0],context.searchCoordinates[1] )
    fetch(`http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${context.searchCoordinates[0]}&lon=${context.searchCoordinates[1]}&dt=${1638626181}&APPID=${process.env.REACT_APP_WEATHER}`)
    .then(response => response.json())
    .then(res =>{ console.log(res)
    
    })
    // fetch(`http://localhost:3000/`)
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
      THI en date du : 
      <form onSubmit={handleSubmit}>
        <input type="date" id="date" name="date" value={date ? date : "2019-06-01"} min="2018-01-01" max="2021-12-31" onChange={e => setDate(e.target.value)}/>
        <button type="submit">Voir l'historique</button>
       </form>
      </>
      :
      false }
      </section>
    </main>
  )
}

export default Home
