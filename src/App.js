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
import Footer from './Layout/Footer';
import AdvisedSites from './pages/AdvisedSites';
import MySites from './pages/MySites';
import AdvisedSite from './pages/AdvisedSite';

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
            <Route path="/elevages-suivis" element={jwtToken ? <AdvisedSites/> : false} />
            <Route path="/mes-elevages" element={jwtToken ? <MySites/> : false} />
            <Route path="/profile" element={jwtToken ? <Profile/> : false} />  
            <Route path="/mes-elevages-conseilles/:slug" element={jwtToken ? <AdvisedSite/> : false} />  
          </Routes>
          <Footer/>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
