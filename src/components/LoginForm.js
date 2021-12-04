import * as React from "react";
import { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(GlobalContext);
  console.log(context.setCurrentUser, context.currentUser);
  const logIn = async (datas) => {
    fetch("http://localhost:3000/users/sign_in", {
      body: JSON.stringify(datas),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        response.headers.forEach((el) => {
          if (el.includes("Bearer")) {
            let token_jwt = el;
            console.log(token_jwt, "TOKEN CONNEXION");
            context.setJwtToken(token_jwt);
            console.log(context);
            localStorage.setItem("jwt_token", token_jwt);
          }
        });
        return response.json();
      })
      .then((resp) => {
        context.setCurrentUser({ user: resp, avatar: "" })
        localStorage.setItem("user", JSON.stringify(resp.user))
        console.log("localStorage!!! ", localStorage)
        navigate(`/profile`);
      } )
      .catch((error) => console.error(error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const datas = {
      user: {
        email: email,
        password: password,
      },
    };
    logIn(datas);
  };
  if (!context.jwtToken) {
    return (
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              label="Email"
              variant="filled"
              type="email"
              required
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
          <label htmlFor="password">Password:</label>
            <input
              label="Password"
              variant="filled"
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" variant="outlined" color="primary">
              Se connecter
            </button>
          </div>
        </form>
      </main>
    );
  } else {
    navigate("/", { replace: true });
  }
}

export default LoginForm;
