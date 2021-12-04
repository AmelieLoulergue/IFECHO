import classes from "./Profile.module.css";
import { useContext, useState } from "react";
import {useNavigate} from "react-router"
import GlobalContext from "../context/GlobalContext";
import TableThi from "../components/TableThi";

function Profile() {
  const [modifyLastName, setModifyLastName] = useState(false);
  const [modifyFirstName, setModifyFirstName] = useState(false);
  const [newLastName, setNewLastName] = useState();
  const [newFirstName, setNewFirstName] = useState();
  const [dateThi, setDateThi] = useState();
  const [siteInfo, setSiteInfo] = useState({})

  let navigate = useNavigate()

  const ctx = useContext(GlobalContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const updateHandler = async (e, field) => {
    e.preventDefault();
    const res = await fetch(`https://ifecho-api.herokuapp.com/users/${currentUser.id}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          [field]: field === "first_name" ? newFirstName : newLastName,
        },
      }),
      method: "PUT",
    });
  };

  const showInput = (field) => {
    if (field === "last_name") {
      setModifyLastName(!modifyLastName);
    } else if (field === "first_name") {
      setModifyFirstName(!modifyFirstName);
    }
  };

  const fetchSite = async()=>{
    // navigate(`/profile/${dateThi.toString()}`)
  
    const res = await fetch("http://localhost:3000/sitesdate/1",{
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


  // ATTENTION : pour que les modifications (nom, prénom) soient prises en compte, il faudra se déconnecter et se reconnecter
  return (
    <main>
      <h2>Vos exploitations :</h2>
      <div className={classes["round-chart"]}>
        <input type="date" onChange={(e) => changeDateHandler(e)} />
        {dateThi && <TableThi historical_thi={siteInfo.historical_thi} future_thi={siteInfo.future_thi} dateThi={dateThi} /> }
      </div>

      <h2>Vos informations personnelles :</h2>
      <div className={classes.profile}>
        <div className={classes.avatar}></div>
        <ul className={classes["profile-ul"]}>
          <li>
            <b>Nom :</b> {currentUser.last_name}
            <small
              className={classes.small}
              onClick={() => showInput("last_name")}
            >
              Modifier
            </small>
          </li>
          {modifyLastName && (
            <form onSubmit={(e) => updateHandler(e, "last_name")}>
              <input onChange={(e) => setNewLastName(e.currentTarget.value)} />
            </form>
          )}
          <li>
            <b>Prénom :</b> {currentUser.first_name}
            <small
              className={classes.small}
              onClick={() => showInput("first_name")}
            >
              Modifier
            </small>
          </li>
          {modifyFirstName && (
            <form onSubmit={(e) => updateHandler(e, "first_name")}>
              <input onChange={(e) => setNewFirstName(e.currentTarget.value)} />
            </form>
          )}
          <li>
            <b>Rôle :</b>{" "}
            {(currentUser["is_advisor?"] && "Conseiller") || "Exploitant"}
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Profile;
