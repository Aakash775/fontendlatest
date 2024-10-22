import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
    return(
         <>
           <form className="form-control">
            <div className="mb-2">
                <label>UserName</label>
             <input type="text" className="form-control" required /> 
            </div>
             <div className="mb-2">
               <label>Password</label>
               <input type="password" className="form-control" required />
             </div>
            

             <button type="submit" className="btn btn-primary"> Login </button>
           </form>
         </>

    )
}

export default Login;