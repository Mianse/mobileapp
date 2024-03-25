import React, { useContext, useState } from "react";
import Layout from "../../components/Layout.jsx";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import {useAuth} from '../../context/auth.js'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth()

  const navigate = useNavigate();
  const location =useLocation()
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
       
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("wrong email or password ");
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="container w-50" >
      <div className="form-container p-30 ">
        <form onSubmit={handleSubmit} >
          <h4 className="title">Login form</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
          <button type="submit" className="btn btn-primary ms-2" onClick={(e)=>{navigate('/forgot password')}}>
            forgot password
          </button>
          <button type="submit" className="btn btn-primary ms-2">
            Login
          </button>
          </div>
          
        </form>
      </div>
      </div>
      
    </Layout>
  );
};
export default Login;
