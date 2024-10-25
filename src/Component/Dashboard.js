import React, { useState, useEffect } from "react"
import axios from "axios";
const Dashboard = () =>{
  const [auth, setAuth] = useState(false);
  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);
    const [productData, 
      setProductData] = useState({
         name: '',
         description: '',
         price: ''
    });

    const [productImage, 
      setProductImage] = useState(null);

      const handleProductUpload = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name',
          productData.name);
          data.append('description',
            productData.description);
            data.append('price', productData.price);
            if (productImage){
              data.append('productImage', productImage);
            }
            try{
              await axios.post('http://localhost:3000/user/upload-product', data, {
                headers: {
                  'x-auth.token': 
                  localStorage.getItem('token') 
                  //Assuming token is stored in localStorage
                }
              });
              alert('Product upload Successfully');
            }catch (error){
              alert (error.response.data.message);
            }
      };


    return(
        <>
          <div className="container">
             <div className="row">
               <div className="col-lg-12">
                  <div className="card">
                     <form onSubmit={handleProductUpload}>
                        <div className="mb-3">
                          <label>Product Name</label>
                          <input type="text"
                          placeholder="Product Name"
                          onChange = {(e) => setProductData({...productData, name: e.target.value})}
                          required
                          className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <label>Product Description</label>
                          <textarea type="text"
                          placeholder="Product Description"
                          onChange={(e) => setProductData({...productData, description: e.target.value})}
                          className="form-control"
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label>Price</label>
                          <input type="number"
                          placeholder="Type Price"
                          onChange={(e) => setProductData({...productData, price: e.target.value})}
                          required
                          />
                        </div>
                        <div className="mb-3">
                          <label>Product Image</label>
                          <input type="file"
                         onChange={(e) => setProductImage(e.target.files[0])}
                          />

                        </div>
                        <div className="mb-3">
                          <button type="submit" className="btn btn-primary">Add Product</button>
                        </div>
                     </form>
                  </div>
               </div>
             </div>
          </div>
        </>
    )
}

export default Dashboard;