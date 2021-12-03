import React from 'react'
import { Link } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext';
import {useContext} from 'react';
function Navbar() {
  const context = useContext(GlobalContext)
  console.log(context)
  const logOut = () => {fetch("http://localhost:3000/users/sign_out", {
      headers: {
        "Authorization": localStorage.getItem("jwt_token"),
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
        .then(async (response) => 
        {
          console.log(context, "caca")
          console.log(localStorage.getItem("jwt_token"))
          console.log("ca marche", response)
          console.log(localStorage.getItem("jwt_token"), "avant delete")
          localStorage.removeItem('jwt_token')
          context.setJwtToken("")
          console.log(localStorage.getItem("jwt_token"), "après delete")
          
        })
        .catch((error) => console.error(error));
      }
      console.log(context)
  return (
    <div>
      <Link to ="/">IFECHO</Link>
      {!context.jwtToken ? 
      <>
      <Link to ="/login">Connexion</Link>
      <Link to ="/signup">S'inscrire</Link>
      </>
      :
      <>
      <Link to="/profile">Mon profil</Link>
      <button onClick={logOut}>Déconnexion</button>
      </>}
    </div>
  )
}

export default Navbar
