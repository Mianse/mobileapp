import React from 'react'

import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import { useEffect,useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Select} from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
const {Option} =Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
  const [categories,setCategories] = useState([])
  const [name,setName]=useState("")
  const[description,setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity,setQuantity] =useState("")
 // const [category, setCategory] = useState({ name: '' }); // Provide a default value with an empty string

  const [category,setCategory] = useState("")
  const[photo,setPhoto] = useState("")
  const [shipping,setShipping] =useState("")
  const [id,setId] = useState("")
 //get single product
 const getSingleProduct = async ()=>{
  try {
    const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
    setName(data.product.name)
    setId(data.product._id)
    setDescription(data.product.description)
    setPrice(data.product.price)
    setQuantity(data.product.quantity)
    setShipping(data.product.shipping)
    setCategory(data.product.category)



  } catch (error) {
    console.log(error)
    toast.error("something went wrong")
  }
 }

 useEffect(()=>{
  getSingleProduct()
 },[])
 
    //get all categories
  const getAllCategories = async()=>{
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

   const handleUpdate= async(e)=>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)

      const categoryId =  category.id || category._id; // Adjust depending on your object structure
      productData.append('category', categoryId);
      
    if (photo) {
      productData.append('photo', photo);
    }
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`,productData)
      if(data?.success){
        toast.success(data?.message)
        navigate('/dashboard/admin/products')
      }else{
        toast.error("something went wrong in updating")
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
 }
 //handle delete
 const handleDelete = async(e)=>{
    e.preventDefault()
    try {
      let answer = window.prompt("are you sure you want to delete")
      if(answer === 'yes'){
        const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
      toast.success("Product Dleted successfully")
      navigate('/dashboard/admin/products')
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
            <h1>update product</h1>
            <div className="m-1 w-75">
                <Select bordered={false} placeholder="select a category" 
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value)=>{setCategory(value)}}
                value={category.name}
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
                    {photo ? (
                      <div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="product photo" height={"200px"} className="img img-responsive"/>
                      </div>
                      
                    ) :(
                      <div className="text-center">
                      <img src={`/api/v1/product/product-photo/${id}`} alt="product photo" height={"200px"} className="img img-responsive"/>
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
                 value={shipping ? "yes" : "No"}
                 >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                 </Select>
                </div>
                <div className="mb-3">
                      <button className="btn btn-primary" onClick={handleUpdate}>UPDATE PRODUCT</button>
                </div>
                <div className="mb-3">
                      <button className="btn btn-danger" onClick={handleDelete}>DELETE PRODUCT</button>
                </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct

