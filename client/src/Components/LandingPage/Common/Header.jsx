import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  // Retrieve user type from localStorage
  const userData = JSON.parse(localStorage.getItem("userdata") || "{}");
  const userType = userData?.authid?.usertype;
  console.log(userType);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userdata');
  
    toast.success('Logged out successfully!', {
      position: "top-right",
      autoClose: 1000,
    });
  
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <header className="header_area navbar_fixed">
      <div className="main_menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <a className="navbar-brand logo_h" href="index.html">
              <img src="img/logo.png" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar"></span> <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* Collect the nav links, forms, and other content for toggling */}
            <div
              className="collapse navbar-collapse offset"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav menu_nav ml-auto">
                
                {userType == 0 && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="/admin">
                        Admin Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/manage-users">
                        Manage Users
                      </a>
                    </li>
                  </>
                )}
                {userType == null && (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="#about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#services">
                        Features
                      </a>
                      
                    </li>
                    <li>
                    <a href="/AuthPage" class="primary-btn ml-sm-3 ml-0 mt-2">Login</a>
                    </li>
                  </>
                )}
                {userType == 1 && (
                  <>
                     <li className="nav-item">
                      <button className="btn btn-danger ms-5" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                    {/*<li className="nav-item">
                      <a className="nav-link" href="/signup">
                        Signup
                      </a>
                    </li> */}
                  </>
                )}
                {userType == 2 && (
                  <>
                     <li className="nav-item">
                      <button className="btn btn-danger ms-5" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                    {/*<li className="nav-item">
                      <a className="nav-link" href="/signup">
                        Signup
                      </a>
                    </li> */}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
