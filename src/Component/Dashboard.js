import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [productImage, setProductImage] = useState(null);

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
            <form onSubmit={handleProductUpload}>
                <input
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Product Description"
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Dashboard;
