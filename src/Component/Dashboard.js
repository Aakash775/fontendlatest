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

            <h2>All Uploaded Product</h2>
            <ul>
            {products.map((prod) => (
                    <li key={prod._id}>
                        <h4>{prod.name}</h4>
                        <p>{prod.description}</p>
                        <p>{prod.price} {prod.productImage}</p>
                        {prod.productImage && (
                            <img src={`/${prod.productImage}`} alt={prod.name} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
