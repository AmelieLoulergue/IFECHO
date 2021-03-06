import React from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { useContext } from "react";
import classes from "./Navbar.module.css";

function Navbar() {
  const context = useContext(GlobalContext);
  console.log(context);
  const logOut = () => {
    fetch("https://ifecho-api.herokuapp.com/users/sign_out", {
      headers: {
        "Authorization": localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(async (response) => {
        context.setCurrentUser("")
        context.setJwtToken("");
        localStorage.clear()
      })
      .catch((error) => console.error(error));
  };
  console.log(context);
  return (
    <header>
    <nav className={classes.nav}>
      <h2><Link to="/">IFECHO</Link></h2>
      {!context.jwtToken ? (

          <ul className={classes["nav-ul"]}>
            <li className={classes["nav-link"]}><Link to="/login">Connexion</Link></li>
            <li className={classes["nav-link"]}> <Link to="/signup">S'inscrire</Link></li>
          </ul>

      ) : (
        <ul className={classes["nav-ul"]}>
          <li className={classes["nav-link"]}><Link to="/elevages-suivis">Vos élevages suivis</Link></li>
          <li className={classes["nav-link"]}><Link to="/mes-elevages">Mes élevages</Link></li>
          <li className={classes["nav-link"]}><Link to="/profile">Mon profil</Link></li>
          <li className={classes["nav-link"]} onClick={logOut}><Link to="/">Déconnexion</Link></li>
        </ul>
      )}
    </nav>
    </header>
  );
}

export default Navbar;
