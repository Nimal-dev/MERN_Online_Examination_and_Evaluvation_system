// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function StudentHeader() {
//     const userData = JSON.parse(localStorage.getItem("userdata") || "{}");
//     const userType = userData?.authid?.usertype;
//     const navigate = useNavigate();
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4000/notify/notifications/${userData.classId}`);
//                 const data = await response.json();
//                 setNotifications(data);
//             } catch (error) {
//                 console.error("Error fetching notifications:", error);
//             }
//         };

//         if (userType !== null) {
//             fetchNotifications();
//         }
//     }, [userType, userData.classId]);

//     const handleLogout = () => {
//         localStorage.removeItem('userdata');

//         toast.success('Logged out successfully!', {
//             position: "top-right",
//             autoClose: 1000,
//         });

//         setTimeout(() => {
//             navigate('/');
//         }, 1500);
//     };

//     return (
//         <header className="header_area navbar_fixed">
//             <div className="main_menu">
//                 <nav className="navbar navbar-expand-lg navbar-light">
//                     <div className="container">
//                         <a className="navbar-brand logo_h" href="index.html">
//                             <img src="img/logo.png" alt="" />
//                         </a>
//                         <button
//                             className="navbar-toggler"
//                             type="button"
//                             data-toggle="collapse"
//                             data-target="#navbarSupportedContent"
//                             aria-controls="navbarSupportedContent"
//                             aria-expanded="false"
//                             aria-label="Toggle navigation"
//                         >
//                             <span className="icon-bar"></span> <span className="icon-bar"></span>
//                             <span className="icon-bar"></span>
//                         </button>
//                         <div
//                             className="collapse navbar-collapse offset"
//                             id="navbarSupportedContent"
//                         >
//                             <ul className="nav navbar-nav menu_nav ml-auto">
//                                 {userType === 0 && (
//                                     <>
//                                         <li className="nav-item">
//                                             <a className="nav-link" href="/admin">
//                                                 Admin Dashboard
//                                             </a>
//                                         </li>
//                                         <li className="nav-item">
//                                             <a className="nav-link" href="/manage-users">
//                                                 Manage Users
//                                             </a>
//                                         </li>
//                                     </>
//                                 )}
//                                 {userType === null && (
//                                     <>
//                                         <li className="nav-item">
//                                             <a className="nav-link" href="#about">
//                                                 About
//                                             </a>
//                                         </li>
//                                         <li className="nav-item">
//                                             <a className="nav-link" href="#services">
//                                                 Features
//                                             </a>
//                                         </li>
//                                     </>
//                                 )}
//                                 {(userType === 1 || userType === 2) && (
//                                     <>
//                                         <li className="nav-item dropdown">
//                                             <a
//                                                 className="nav-link dropdown-toggle"
//                                                 href="#"
//                                                 id="navbarDropdown"
//                                                 role="button"
//                                                 data-toggle="dropdown"
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                             >
//                                                 Notifications
//                                             </a>
//                                             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                                 {notifications.length === 0 ? (
//                                                     <a className="dropdown-item" href="#">
//                                                         No new notifications
//                                                     </a>
//                                                 ) : (
//                                                     notifications.map((notification, index) => (
//                                                         <a key={index} className="dropdown-item" href="#">
//                                                             {notification.message}
//                                                         </a>
//                                                     ))
//                                                 )}
//                                             </div>
//                                         </li>
//                                         <li className="nav-item">
//                                             <button className="btn btn-danger ms-5" onClick={handleLogout}>
//                                                 Log Out
//                                             </button>
//                                         </li>
//                                     </>
//                                 )}
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//             <ToastContainer />
//         </header>
//     );
// }

// export default StudentHeader;








import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function StudentHeader() {
    const userData = JSON.parse(localStorage.getItem("userdata") || "{}");
    const userType = userData?.authid?.usertype;
    const currentClassId = userData?.classId; // Retrieve current classId from local storage
    console.log(userType);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [newNotificationsCount, setNewNotificationsCount] = useState(0);
console.log("Logged In classid:",userData);
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('http://localhost:4000/student/notifications');
          const data = await response.json();
          
          // Filter notifications based on classId
          const filteredNotifications = data.filter(notification => notification.classId === currentClassId);
          setNotifications(filteredNotifications);
          setNewNotificationsCount(filteredNotifications.length);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
  
      fetchNotifications();
    }, [currentClassId]);

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

    const handleNotificationClick = async (id) => {
      try {
        await fetch('http://localhost:4000/student/markAsRead', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: [id] }),
        });
  
        // Remove the notification from the state
        setNotifications(notifications.filter(notification => notification._id !== id));
        setNewNotificationsCount(newNotificationsCount - 1);


  
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    };

    return (
      <header className="header_area navbar_fixed">
        <div className="main_menu">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
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
              <div
                className="collapse navbar-collapse offset"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav menu_nav ml-auto">
                  
                  {userType === 0 && (
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
                  {userType === null && (
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
                    </>
                  )}
                  {userType === 1 && (
                    <>
                       <li className="nav-item">
                        <button className="btn btn-danger ms-5" onClick={handleLogout}>
                          Log Out
                        </button>
                      </li>
                    </>
                  )}
                  {userType === 2 && (
                    <div className="navbar-nav  ms-auto">
                      <div className="nav-item dropdown">
                        <a href="#" className="nav-link" id="notificationsDropdown" data-bs-toggle="dropdown">
                        Notifications <i className="fa fa-bell"></i>
                          {newNotificationsCount > 0 && (
                            <span className="badge bg-danger">{newNotificationsCount}</span>
                          )}
                        </a>
                        <div className="dropdown-menu dropdown-menu-end  border-0 rounded-0 rounded-bottom m-0">
                          {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                              <a
                                key={notification._id}
                                href="#exam"
                                className="dropdown-item"
                                onClick={() => handleNotificationClick(notification._id)}
                              >
                                <h6 className="fw-normal mb-0" style={{color:"black"}}>
                                  <strong>{index + 1}. </strong>{notification.message}
                                </h6>
                                <small>{new Date(notification.timestamp).toLocaleString()}</small>
                              </a>
                            ))
                          ) : (
                            <p className="dropdown-item text-center">No notifications</p>
                          )}
                          <hr className="dropdown-divider" />
                        </div>
                      </div>
                      <li className="nav-item">
                        <button className="btn btn-danger ms-5" onClick={handleLogout}>
                          Log Out
                        </button>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
}

export default StudentHeader;

