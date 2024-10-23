import React, {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => 
  {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/user/login', {username, password});
      localStorage.setItem('token',res.data.token);
      window.location = '/test';
    }catch (error){
      alert (error.response.data.message);
    }
  };
    return(
         <>
           <form className="form-control" onSubmit={handleLogin}>
            <div className="mb-2">
                <label>UserName</label>
             <input 
             type="text"
              className="form-control" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              /> 
            </div>
             <div className="mb-2">
               <label>Password</label>
               <input 
               type="password" 
               className="form-control" 
               required
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               
               />
             </div>
            

             <button type="submit" className="btn btn-primary"> Login </button>
           </form>
         </>

    )
}

export default Login;