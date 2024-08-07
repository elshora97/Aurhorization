import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import "./App.css";
import Login from "./component/Login";
import Home from "./component/Home";
import ForgetPassword from "./component/ForgetPassword";
import ResetPassword from "./component/ResetPassword";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
