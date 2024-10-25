import Login from "./Login";
import Register from './Component/Register';
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Header from "./Component/Header";


function App() {
  return (
   <>
   <Router>
    <div>
      
         <Header />
       <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={ <Register />} />
      
       </Routes>
    </div>
   </Router>
 
   
   
   </>
  );
}

export default App;
