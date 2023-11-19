import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

import "./Home.css"; 
import image1 from "./images/5.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, [user, navigate]);

  const downloadAsPDF = () => {
    
    console.log("Downloading PDF...");
  };

  return (
    <div className="full-width-container">
      <header className="header-bg">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            
            <Link to="/" className="navbar-brand">
  Employee Management Console
</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#services">
                    Our Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#getInTouch">
                    Get in Touch
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="jumbotron text-center">
        <img src={image1} alt="Employee Management" className="img-fluid mb-4" />
        <h1 className="display-4">Welcome {user ? user.name : null}</h1>
        <p className="lead">
          Manage your employees efficiently with our Employee Management Console.
        </p>
        <a className="btn btn-info btn-lg" href="/create" role="button">
          Add Contacts
        </a>
      </div>

      <section id="services" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card h-100 service-card">
                <img src={image2} className="card-img-top" alt="Service 1" />
                <div className="card-body">
                  <h4 className="card-title">Employee Data Management</h4>
                  <p className="card-text">
                    Easily manage and organize employee information with our
                    user-friendly console.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 service-card">
                <img src={image3} className="card-img-top" alt="Service 2" />
                <div className="card-body">
                  <h4 className="card-title">Attendance Tracking</h4>
                  <p className="card-text">
                    Keep track of employee attendance and work hours effortlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card h-100 service-card">
                <img src={image4} className="card-img-top" alt="Service 3" />
                <div className="card-body">
                  <h4 className="card-title">Performance Analytics</h4>
                  <p className="card-text">
                    Gain insights into employee performance with our analytics tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="getInTouch" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Get in Touch</h2>
          <p className="lead">
            Have questions or need assistance? Contact us, and we'll be happy
            to help.
          </p>
          <a href="#" className="btn btn-primary btn-lg">
            Contact Us
          </a>
        </div>
      </section>

      <footer className="bg-dark text-light py-3">
        <div className="container text-center">
          <p>&copy; 2023 Employee Management Console</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
