import classes from "./Profile.module.css";
import { useContext, useRef, useState } from "react";
import GlobalContext from "../context/GlobalContext";

function Profile() {
  const [modifyLastName, setModifyLastName] = useState(false);
  const [modifyFirstName, setModifyFirstName] = useState(false);
  const [newLastName, setNewLastName] = useState()
  const [newFirstName, setNewFirstName] = useState()

  const ctx = useContext(GlobalContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const updateHandler = async (field) => {
    const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
      headers: {
        "Authorization": localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          [field]: field==="first_name" ? newFirstName : newLastName
        },
      }),
      method: "PUT",
    });
  };

  const showInput = (field) => {
    if(field === "last_name"){
      setModifyLastName(!modifyLastName)
    } else if(field==="first_name") {
      setModifyFirstName(!modifyFirstName)
    }
  }
// ATTENTION : pour que les modifications (nom, prénom) soient prises en compte, il faudra se déconnecter et se reconnecter
  return (
    <main>
      <h2>Vos exploitations :</h2>
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
              <form onSubmit={() => updateHandler("last_name")}>
              <input onChange={(e=>setNewLastName(e.currentTarget.value))} />
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
              <form onSubmit={() => updateHandler("first_name")}>
                <input onChange={(e=>setNewFirstName(e.currentTarget.value))} />
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
