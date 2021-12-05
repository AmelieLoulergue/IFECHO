import { useParams } from "react-router"
import TableThi from "../components/TableThi"
import Breeder from "./Breeder"
import { useState } from "react"
import { useContext } from "react"
import GlobalContext from "../context/GlobalContext"

const AdvisedSite = () => {
  const { slug } = useParams()
  const [dateThi, setDateThi] = useState();
  const [siteInfo, setSiteInfo] = useState({})


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
      <h2>{slug}</h2>
      {slug === "derval" && (
        <>
          <div>
            <input type="date" onChange={(e) => changeDateHandler(e)} />
            {dateThi && <TableThi historical_thi={siteInfo.historical_thi} future_thi={siteInfo.future_thi} dateThi={dateThi} />}
            <br />
            {dateThi && <Breeder dateThi={dateThi} />}
          </div>
        </>
      )}
    </main>
  )



}

export default AdvisedSite
