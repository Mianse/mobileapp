import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import { useEffect,useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option} =Select
const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories,setCategories] = useState([])
  const [name,setName]=useState("")
  const[description,setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity,setQuantity] =useState("")
  const [category,setCategory] = useState("")
  const[photo,setPhoto] = useState("")
  const [shipping,setShipping] =useState("")


//get all categories
  const getAllCategories = async(req,res)=>{
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting categories')
    }
   }
   useEffect(()=>{
    getAllCategories()
   },[])

   const handleCreate = async(e)=>{
      e.preventDefault()
      try {
        const productData = new FormData()
        productData.append('name', name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('quantity', quantity)
        productData.append('category', category)
        productData.append('photo', photo)
        const {data} = await axios.post("/api/v1/product/create-product",productData)
        if(data?.success){
          toast.success("product created succesfully")
          navigate('/dashboard/admin/products')
        }else{
          toast.error(data?.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("something went wrong")
      }
   }
  return (
    <Layout title="dashboard-createproduct">
    <div className="container-fluid m-3 p-3">
      <div className='row'>
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1>create product</h1>
            <div className="m-1 w-75">
                <Select bordered={false} placeholder="select a category" 
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value)=>{setCategory(value)}}
                 >
                  {categories?.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))}

                </Select>
                <div className="mb-3">
                  <label htmlFor="upload Images" className="btn btn-outline-summary">
                    {photo? photo.name:"Upload photo"} 
                  </label>
                  <input type="file" name="photo" accept="images/*" onChange={(e)=> setPhoto(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="product photo" height={"200px"} className="img img-responsive"/>
                      </div>
                      
                    )}
                </div>
                <div className="mb-3">
                  <input type="text" 
                  value={name} 
                  placeholder="write a name" 
                  className="form-control"
                  onChange={(e)=>setName(e.target.value)}
                   />
                </div>
                <div className="mb-3">
                  <textarea type="text" 
                  value={description} 
                  placeholder="write a description" 
                  className="form-control"
                  onChange={(e)=>setDescription(e.target.value)}
                   />
                </div>
                <div className="mb-3">
                  <input type="text" 
                  value={price} 
                  placeholder="write a price" 
                  className="form-control"
                  onChange={(e)=>setPrice(e.target.value)}
                   />
                </div>
                <div className="mb-3">
                  <input type="text" 
                  value={quantity} 
                  placeholder="write quantity" 
                  className="form-control"
                  onChange={(e)=>setQuantity(e.target.value)}
                   />
                <div className="mb-3">
                 <Select
                 bordered={false}
                 placeholder="select shipping"
                 size="large"
                 showSearch
                 className="form-control mb-3"
                 onChange={(value)=>{setShipping(value)}}
                 >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                 </Select>
                </div>
                <div className="mb-3">
                      <button className="btn btn-primary" onClick={handleCreate}>CREATE PRODUCT</button>
                </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
