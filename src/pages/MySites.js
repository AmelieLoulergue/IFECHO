import classes from "./Profile.module.css";
import { useContext, useState } from "react";
import {useNavigate} from "react-router"
import GlobalContext from "../context/GlobalContext";
import TableThi from "../components/TableThi";
import Breeder from "./Breeder";
const MySites = () => {
  const [dateThi, setDateThi] = useState();
  const [siteInfo, setSiteInfo] = useState({})

  let navigate = useNavigate()

  const ctx = useContext(GlobalContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchSite = async()=>{
    // navigate(`/profile/${dateThi.toString()}`)
  
    const res = await fetch("https://ifecho-api.herokuapp.com/sitesdate/1",{
      headers:{
        "Content-Type":"application/json"
      },
      method:"POST",
      body:JSON.stringify({
        date:dateThi
      })
    })
    const data = await res.json()
    setSiteInfo(data)
    console.log(data)
  }

  const changeDateHandler = (e) => {
    setDateThi(e.target.value)
    fetchSite()
  }

  return (
    <main>
      <h1>Vos élevages :</h1>
      <h3>Veuillez sélectionner une date</h3>
      <div className={classes["round-chart"]}>
        <input type="date" defaultValue="2019-06-15" onChange={(e) => changeDateHandler(e)} />
        {dateThi && <TableThi historical_thi={siteInfo.historical_thi} future_thi={siteInfo.future_thi} dateThi={dateThi} /> }
        <br/>
        {dateThi && <Breeder dateThi={dateThi} /> }
      </div>
    </main>
  )
}

export default MySites
