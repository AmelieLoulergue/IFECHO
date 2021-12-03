import { createContext} from 'react';

const GlobalContext = createContext({ JwtToken: "", setJwtToken:"", currentUser: "", setCurrentUser:""});

export default GlobalContext;