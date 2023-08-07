import { createContext, useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
     const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') ||null));

     axios.defaults.withCredentials= true;

     const login = async(inputs) =>{
        const res =  await axios.post("http://localhost:2000/api/auth/login", inputs);
      //   const other = res.data;
      //   cookie.set('access_token', JSON.stringify(other));
        setCurrentUser(res.data);
     };

     const logout = async(inputs) =>{
        await axios.post('http://localhost:2000/api/auth/logout');
        cookie.remove('access_token');
        setCurrentUser(null);
     };

     useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser))
     }, [currentUser]);

     return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
        </AuthContext.Provider>
}