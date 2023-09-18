import React, { useEffect } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { useGlobalState } from "./context";
import "./index.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppContext } from "./context";
import UserDash from "./dash/UserDash";
import AdminDash from "./dash/AdminDash";
import Courses from "./pages/Courses";
import ContactForm from "./pages/Contact";

const App = () => {
  const { isLoggedIn } = useGlobalState();


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
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
