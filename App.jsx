import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserDash from "./dash/user/UserDash";
import AdminDash from "./dash/admin/AdminDash";
import Courses from "./pages/Courses";
import ContactForm from "./pages/Contact";
import Error from "./pages/Error";

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<UserDash />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/*" element={<Error />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
