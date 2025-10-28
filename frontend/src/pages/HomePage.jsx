import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container-fluid mt-4">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold text-primary mb-3">
            Welcome to People Manager
          </h1>
          <p className="lead mb-4">
            Efficiently manage your employee database with our comprehensive people management solution. 
            Create, update, and organize employee information with ease.
          </p>
          <div className="d-flex gap-3">
            <Link to="/listpage" className="btn btn-primary btn-lg">
              View Employees
            </Link>
            <Link to="/create" className="btn btn-outline-primary btn-lg">
              Add New Employee
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="text-center">
            <div className="bg-light rounded p-5">
              <i className="bi bi-people display-1 text-primary"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Why Choose Our Platform?</h2>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-speedometer2 display-4 text-primary mb-3"></i>
              <h5 className="card-title">Fast & Efficient</h5>
              <p className="card-text">
                Quick access to employee data with intuitive navigation and search capabilities.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-shield-check display-4 text-success mb-3"></i>
              <h5 className="card-title">Secure & Reliable</h5>
              <p className="card-text">
                Your data is safe with our secure storage and backup systems.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-graph-up display-4 text-info mb-3"></i>
              <h5 className="card-title">Easy to Use</h5>
              <p className="card-text">
                User-friendly interface designed for both technical and non-technical users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row">
        <div className="col-12">
          <div className="bg-primary text-white rounded p-4">
            <div className="row text-center">
              <div className="col-md-3">
                <h3 className="fw-bold">500+</h3>
                <p>Employees Managed</p>
              </div>
              <div className="col-md-3">
                <h3 className="fw-bold">99%</h3>
                <p>Uptime Reliability</p>
              </div>
              <div className="col-md-3">
                <h3 className="fw-bold">24/7</h3>
                <p>Support Available</p>
              </div>
              <div className="col-md-3">
                <h3 className="fw-bold">50+</h3>
                <p>Happy Companies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;