import classes from "./Profile.module.css"
import {useContext} from "react"
import GlobalContext from "../context/GlobalContext";

function Profile() {

  const ctx = useContext(GlobalContext)
  const currentUser = JSON.parse(localStorage.getItem("user"))

  return (
    <main>
        <h2>Vos exploitations :</h2>
      <h2>Vos informations personnelles :</h2>
      <div className={classes.profile}>
        <div className={classes.avatar}></div>
      <ul className={classes["profile-ul"]}>
        <li>
          <b>Nom :</b> {currentUser.last_name}
        </li>
        <li>
          <b>Prénom :</b> {currentUser.first_name}
        </li>
        <li>
          <b>Rôle :</b> {currentUser["is_advisor?"] && "Conseiller" || "Exploitant"}
        </li>
      </ul>
      </div>
    </main>
  );
}

export default Profile;
