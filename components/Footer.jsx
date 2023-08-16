import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useGlobalState } from "../context";


function Footer() {

  const {isLoggedIn} = useGlobalState()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <p className="p-footer-logo">Commurse</p>
        </div>
        <div className="footer-column">
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              {isLoggedIn && <Link to="/logout">Logout</Link>}
              {!isLoggedIn && <Link to="/login">Login</Link>}{" / "}
              {!isLoggedIn && <Link to="/register">Register</Link>}
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <p>Fake Street, City</p><br></br>
          <p>Opening Hours: Mon-Fri 9am-5pm</p>
        </div>
      </div>
      <div className="footer-copyright">
        Commurse&copy; 2023 . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
