import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login'
import Advisor from './pages/Advisor';
import Breeder from './pages/Breeder';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './Layout/Navbar';
import { useState } from 'react';
import GlobalContext from './context/GlobalContext';
function App() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwt_token"))
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUserData"))||"")
  return (
    <div className="App">
      <Router>
        <GlobalContext.Provider value={{jwtToken: jwtToken, setJwtToken:setJwtToken, currentUser: currentUser, setCurrentUser:setCurrentUser, searchCoordinates: ""}}>
          <Navbar/>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={!jwtToken ? <Login /> : false} />
            <Route path="/signup" element={!jwtToken ? <Signup/> : false} />
            <Route path="/advisor" element={jwtToken && currentUser && currentUser.is_advisor ? <Advisor/> : false} />
            <Route path="/breeder" element={jwtToken ? <Breeder/> : false} />
            <Route path="/profile" element={jwtToken ? <Profile/> : false} />  
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
