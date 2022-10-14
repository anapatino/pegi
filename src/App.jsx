import { Routes, Route } from "react-router-dom";
import {Login} from "./pages/login/login";
import {Home} from "./pages/home/home";
import {Dashboard} from "./pages/dashboard/dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}/ >
        <Route path="/ingresar" element={<Login></Login>}/ >
        <Route path="/contacto" element={<Contact/>}/ >
        <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
      </Routes>
    </div>
  );
}
  
const Contact = () => <h1>estas en Contact</h1>

export default App;
