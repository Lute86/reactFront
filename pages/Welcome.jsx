import React from "react";
import { useGlobalState } from "../context";
import { Link } from "react-router-dom";
import "./Welcome.css"; // Import your Welcome component's CSS
import image from "../assets/react.svg";
import aboutImg from "../assets/high-five-sm.jpg";
import companies from "../companies";

function Welcome() {
  const { isLoggedIn, userInfo } = useGlobalState();

  return (
    <div className="welcome-container">
      <section class="background-section">
        <div class="bg-section-content">
          <h1 className="bg-img-title">Welcome to Commurse</h1>
          <p className="bg-img-subtitle">Discover a world of opportunities</p>
        </div>
      </section>
      <section className="about-us">
        <div className="about-us-content">
          <div className="about-us-left">
            {/* You can place your company's image here */}
            <img className="img-about" src={aboutImg} alt="Company" />
          </div>
          <div className="about-us-right">
            <h2>About Us</h2>
            <p className="p-about">
              We're a regional government enterprise dedicated to
              partnering with various companies to provide skill development
              courses for people. Our mission is to empower individuals with
              valuable knowledge and skills to drive personal and professional
              growth.
            </p>
          </div>
        </div>
      </section>
      <section className="values">
        <div className="values-content">
          <h2>Our Values</h2>
          <div className="value-cards">
            <div className="value-card">
              <h3>Empowerment</h3>
              <p>
                We empower individuals by providing access to quality education
                and training, enabling them to acquire valuable skills that
                enhance their personal and professional growth.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We embrace innovation and continuously seek new ways to enhance
                the learning experience. By leveraging technology and creative
                teaching methods, we ensure effective and engaging learning
                journeys.
              </p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>
                Building a strong sense of community is at the heart of what we
                do. We foster collaboration and connections among learners,
                educators, and partners, creating a supportive environment for
                growth and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="companies-involved">
        <h2>Companies Involved</h2>
        <p className="p-companies">
          We collaborate with a diverse range of companies to offer
          comprehensive courses that cater to various industries and skills.
        </p>
        {/* List of company logos */}
        <div className="company-logos">
          {companies.map((company, index) => (
            <img
              key={index}
              src={image}
              alt={company.name}
              title={company.name}
            />
          ))}
          {/* Add more images */}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
