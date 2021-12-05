import React from 'react'
import { useState, useContext} from 'react'
import GlobalContext from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

import './loginform.css'
const SignupForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(GlobalContext)
  const signUp = async (datas) => {
    fetch("https://ifecho-api.herokuapp.com/users", {
    body: JSON.stringify(datas),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(async (response) => {
    response.headers.forEach(el => {
          if(el.includes("Bearer")){
            let token_jwt = el
            console.log(token_jwt, "TOKEN INSCRIPTION")
            localStorage.setItem("jwt_token", token_jwt)
            context.setJwtToken(token_jwt)
          }
        })})
        .catch((error) => console.error(error));
    }
  const handleSubmit = e => {
    e.preventDefault();
    const datas = {
      user: {
        email: email,
        password: password
      }
    }
    signUp(datas)
  }
  if(!context.jwtToken){
  return (
    <main>
    <form className="col-4" onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        
      <input
        className="col-12"
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </div>
      <div>
      <label>Password:</label>
      <input
        className="col-12"
        label="Password"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      </div>
      <div>
        <button type="submit" variant="outlined" color="primary">
          S'inscrire
        </button>
      </div>
    </form>
    </main>
  )}else{
    navigate('/', { replace: true })
  }
}

export default SignupForm