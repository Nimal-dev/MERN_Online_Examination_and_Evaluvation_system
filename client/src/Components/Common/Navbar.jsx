import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [usertype, setUsertype] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata && userdata._id) {
      setUsertype(userdata.authid.usertype);
      if (userdata.authid.usertype === 1) {
        setName(userdata.teacherName);
      } else if (userdata.authid.usertype === 2) {
        setName(userdata.studentName);
      } else {
        setName(userdata.fullname);
      }
    }
  }, []);

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
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top px-4 py-0 w-100">
        <a href="/" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
        </a>
        
        
        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <span className="d-none d-lg-inline-flex">{name}</span>
            </a>
            
            <div className="dropdown-menu dropdown-menu-end bg-secondary rounded-0 rounded-bottom m-0">
              <a href="#" className="dropdown-item" onClick={handleLogout}>Log Out</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
}

export default Navbar;
