import { createContext} from 'react';

const GlobalContext = createContext({ JwtToken: "", setJwtToken:"", currentUser: "", setCurrentUser:"", searchCoordinates:""});

export default GlobalContext;