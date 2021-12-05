function LogOut(context) {
  fetch("https://ifecho-api.herokuapp.com/users/sign_out", {
      headers: {
        "Authorization": localStorage.getItem("jwt_token"),
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
        .then(async (response) => 
        {
          console.log(localStorage.getItem("jwt_token"))
          console.log("ca marche", response)
          console.log(localStorage.getItem("jwt_token"), "avant delete")
          localStorage.removeItem('jwt_token')
          context.setJwtToken("")
          console.log(localStorage.getItem("jwt_token"), "après delete")
        })
        .catch((error) => console.error(error));
}

export default LogOut
