import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password:'',
        address: '',
        phone:''
    });

    const [userImage, setUserImage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('name', formData.name);
        data.append('password', formData.password);
        data.append('address', formData.address);
        data.append('phone', formData.phone);
        if (userImage) {
            data.append('userImage', userImage);
        } else {
            alert('Please upload a profile picture');
            return;
        }

        try {
            await axios.post('http://localhost:3000/user/register', data);  // Update API path
            alert('User Registered Successfully');
            window.location = '/login';
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <form className="form-control" onSubmit={handleRegister}>
                {/* Form fields */}
                <div className="mb-2">
                    <label>UserName</label>
                    <input type="text" placeholder="UserName" className="form-control" required onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                </div>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" placeholder="Name" className="form-control" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="mb-2">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className="form-control" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div className="mb-2">
                    <label>Address</label>
                    <input type="text" placeholder="Address" className="form-control" required onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="mb-2">
                    <label>Phone</label>
                    <input type="text" placeholder="Phone" className="form-control" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="mb-2">
                    <label>UserImage</label>
                    <input type="file" placeholder="UserImage" className="form-control" onChange={(e) => setUserImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    );
};

export default Register;
