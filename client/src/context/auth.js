import { useState ,useEffect, useContext, createContext} from "react";
import axios from 'axios'
const authContext = createContext()

/* 
The AuthProvider component is like a special container that holds information about a user's authentication (login) state.
It keeps track of whether the user is logged in or not
It also provides this information to other parts of the app that need it.
*/

const AuthProvider = ({children}) =>{

    const [auth , setAuth]  = useState({
        user:null, 
        token:""
    })

     axios.defaults.headers.common['Authorization'] = auth?.token;

    //use effect hook 
    useEffect(() =>{
        const data = localStorage.getItem('auth')
    
        if(data){
        const parseData = JSON.parse(data)
        
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token
        })
    }
    //eslint-disable-next-line
    },[]);
    
    //use effect hook

    return( 
        /**
         The authContext.Provider is a special tool that allows other parts
         of the app to access the authentication information stored in the auth variable.
         It wraps the child components and gives them access to this information.
         */
    <authContext.Provider value = {[auth , setAuth]}>
        {children}
    </authContext.Provider>


    )
}

const useAuth = () => useContext(authContext)

export {useAuth , AuthProvider}