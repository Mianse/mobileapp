import React from 'react'
import { useState, useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import axios from "axios"
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    // Handle delete
    const handleDelete = async (id) => { // Pass 'id' as an argument
        try {
            let answer = window.prompt("Are you sure you want to delete")
            if (answer === 'yes') {
                const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
                toast.success("Product Deleted successfully")
                navigate('/dashboard/admin/products')
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Product List</h1>
                    <div className="d-flex  flex-wrap" >
                        {products?.map((p) => (
                            <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
                                <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body ">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <div className="mb-3">
                                            <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>DELETE PRODUCT</button> {/* Pass 'p._id' as argument */}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
