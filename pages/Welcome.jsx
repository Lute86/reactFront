import React, { useEffect } from "react";
import { useGlobalState } from "../context";
import "../index.css";
import aboutImg from "../assets/high-five-long.jpg";
import companies from "../companies";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const { pingUser, userInfo } = useGlobalState();
  const navigate = useNavigate();

  function handleSubscription(){
    navigate('/register')
  }

  return (
    <div className="welcome-container">
      <section className="background-section">
        <div className="bg-section-content">
          <h1 className="bg-img-title">Welcome to N.O.C.</h1>
          <p className="bg-img-subtitle">Discover a world of opportunities</p>
        </div>
      </section>

      {/* About us section */}
      <section className="about-us">
        <div className="about-us-content">
          <div className="about-us-left">
            {/* You can place your company's image here */}
            <img className="img-about" src={aboutImg} alt="Company" />
          </div>
          <div className="about-us-right">
            <h2>About Us</h2>
            <p className="p-about">
              We're a regional government enterprise dedicated to partnering
              with various companies to provide skill development courses for
              people. Our mission is to empower individuals with valuable
              knowledge and skills to drive personal and professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
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
      
      {/* Subscription section */}
      <section className="subscription">
        <div className="subscription-content">
          <h2>Unlock a World of Knowledge</h2>
          <p>
          Gain unlimited access to a diverse range of courses, expert trainings, and valuable career resources. Dive into limitless knowledge with our 30 days trial. You'll enjoy:
          </p>
          <ul className="subscription-features">
            <li>Community forums for networking and collaboration</li>
            <li>Unrestricted access to all current and future courses</li>
            <li>Exclusive training materials and resources</li>
            <li>Interactive learning with industry experts</li>
            <li>Regular updates and new content additions</li>
            <li>Personalized career guidance and support</li>
          </ul>
          <p>
            Don't miss this opportunity! Register now and embark
            on a journey of continuous learning and professional growth.
          </p>
          <div className="subscription-button">
            <button onClick={handleSubscription}>Register Now</button>
          </div>
        </div>
      </section>


      {/* Courses section */}
      <section className="courses">
        <div className="courses-content">
          <h2>Our Courses</h2>
          <div className="course-cards">
            <div className="course-card">
              <h3>Course</h3>
              <p>
                Our diverse range of courses provides fundamental knowledge and
                practical skills in various fields, ensuring a strong foundation
                for your learning journey.
              </p>
            </div>
            <div className="course-card">
              <h3>Training</h3>
              <p>
                Our training programs are designed to enhance specific skills
                and expertise, offering hands-on experience and specialized
                knowledge essential for professional development.
              </p>
            </div>
            <div className="course-card">
              <h3>Career</h3>
              <p>
                Our career-focused courses prepare individuals for specific job
                roles by providing in-depth training, industry insights, and
                practical experience, paving the way for a successful career
                path.
              </p>
            </div>
          </div>
        </div>
      </section>
      


      {/* Companies section */}
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
              className="welcome-companies-img"
              key={index}
              src={company.image}
              alt={company.name}
              title={company.name}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
