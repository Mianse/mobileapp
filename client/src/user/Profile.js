import React from 'react'
import { useState,useEffect } from 'react'
import Layout from '../components/Layout'
import UserMenu from '../components/UserMenu'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  //context
  const [auth,setAuth] =useAuth()
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
       
      });

      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user: data?.updatedUser} )
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("profile updated Successfully")
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //get user details
  useEffect(()=>{
    const {name,email,phone,address} = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  return (
    <Layout title="user-profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
    <div className="col-md-9">
      <div className="form-container w-50">
        <form onSubmit={handleSubmit}>
          <h4 className="title">USER DETAILS</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div> 
            </div>

        </div>
      </div>
    </Layout>
  )
}

export default Profile
