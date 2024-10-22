import Login from "./Login";
import Register from './Component/Register';


function App() {
  return (
   <>
   <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h2>Login here</h2>
      <Login />
      </div>
      <div className="col-lg-6">
        <h2>Register Here</h2>
        <Register />
      </div>
    </div>
   </div>
   
   
   </>
  );
}

export default App;
