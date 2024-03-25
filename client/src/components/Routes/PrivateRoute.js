import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
     
function PrivateRoute() { 
const [ok, setOk] = useState(false);
const [auth] = useAuth(); // Assuming useAuth returns [auth, setAuth] 

useEffect(() => { 
const authCheck = async () => { 
          try {
             const res = await axios.get("/api/v1/auth/user-auth");
              if (res.data.ok) {
                 setOk(true);
                 } else { 
                  setOk(false);
                 } 
                } catch (error) { 
                  // Handle errors from the API request here
                   console.error("Error checking authentication:", error);
                    setOk(false); // Set ok to false on error
                   } 
                  }; 
                  
                  if (auth?.token) { 
                    authCheck();
                   } 
                  }, [auth]);
                   return ok ? <Outlet/> : <Spinner path="/"/>
                   } 
                   
export default PrivateRoute;