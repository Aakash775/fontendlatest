import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [productImage, setProductImage] = useState(null);

    const [products, setProducts] = useState([]); // Define products and setProducts here

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get('http://localhost:3000/user/product', {
                    headers: { 'x-auth-token': localStorage.getItem('token') },
                });
                setProducts(res.data); // Use setProducts to update products state
            } catch (error) {
                alert(error.response?.data?.message || 'Error fetching products');
            }
        };
        fetchProduct();
    }, []);

    const handleProductUpload = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', productData.name);
        data.append('description', productData.description);
        data.append('price', productData.price);
        if (productImage) {
            data.append('productImage', productImage);
        }

        try {
            await axios.post('http://localhost:3000/user/product', data, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            alert('Product uploaded successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error uploading product');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                <form className="form-control" onSubmit={handleProductUpload}>
                <input
                className="form-control mb-3"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    required
                />
                <textarea
                className="form-control mb-3"
                    placeholder="Product Description"
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
                <input
                className="form-control mb-3"
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    required
                />
                <input
                className="form-control mb-3"
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
                </div>
               
               <div className="col-lg-6">
               <div className="card mt-3">
    <div className="card-title">
    <h2>All Uploaded Product</h2>
    </div>
    <div className="card-body">
    <ul className="list-unstyled">
            {products.map((prod) => (
                    <li key={prod._id}>
                       Product Title: <h4> {prod.name}</h4>
                        <p>Product Description: {prod.description}</p>
                        <p>Product Price: {prod.price} {prod.productImage}</p>
                        <p>
                        {prod.productImage && (
                            <img src={`http://localhost:3000/upload/${prod.productImage}`} alt={prod.name} style={{width: '250px'}} />
                            
                        )}
                        </p>
                    </li>
                ))}
                <li>
                    <button type="submit">Delete</button>
                </li>
            </ul>
    </div>
</div>
               </div>


            </div>
           

           
           
        </div>
    );
};

export default Dashboard;
