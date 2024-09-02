import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Authpage() {
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateSignInForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpForm = () => {
    const newErrors = {};
    if (!teacherName) {
      newErrors.teacherName = 'Full Name is required';
    }
    if (!subject) {
      newErrors.subject = 'Subject is required';
    }
    if (!contact) {
      newErrors.contact = 'Contact is required';
    }
    if (!address) {
      newErrors.address = 'Address is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".authcontainer");

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    }

    return () => {
      if (sign_up_btn && sign_in_btn) {
        sign_up_btn.removeEventListener("click", () => {
          container.classList.add("sign-up-mode");
        });

        sign_in_btn.removeEventListener("click", () => {
          container.classList.remove("sign-up-mode");
        });
      }
    };
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validateSignInForm()) {
      return;
    }
    let param = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/auth/SignIn", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Invalid password' && data !== 'Invalid email' && data !== 'User not found') {
          localStorage.setItem("userdata", JSON.stringify(data));
          const userType = data.authid.usertype;
          let path;
          if (userType == 0) {
            path = '/AdminHome';
          } else if (userType == 1) {
            path = '/TeacherHome';
          } else if (userType == 2) {
            path = '/StudentHome';
          } else if (userType === 3) {
            path = '/';
          } else {
            console.log("Unknown user type");
          }
          toast.success('Login Successful!', {
            autoClose: 1000,
            onClose: () => navigate(path)  
          });
        } else {
          const newErrors = {};
          if (data === 'Invalid password') {
            newErrors.password = 'Invalid password';
          } else if (data === 'Invalid email' || data === 'User not found') {
            newErrors.email = 'Invalid email or user not found';
          }
          setErrors(newErrors);
          toast.error('Login Failed!');
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const handleSignup = () => {
    if (!validateSignUpForm()) {
      return;
    }
    let param = {
      teacherName: teacherName,
      subject: subject,
      contact: contact,
      address: address,
      email: email,
      password: password,
      usertype: 1,
    };
    fetch("http://localhost:4000/auth/SignUp", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "success") {
          toast.success('Signup Successful!', {
            autoClose: 1000,
          });
        } else {
          const newErrors = {};
          if (data.message === 'Email already exists') {
            newErrors.email = 'Email already exists';
          }
          setErrors(newErrors);
          toast.error('Signup Failed!', { autoClose: 1000 });
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        toast.error('An error occurred. Please try again.');
      });
  };

  return (
    <div className="authcontainer">
      <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          {/*---------------------- Sign In Form ------------------------------*/}
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="button" className="btn" onClick={handleSignIn}>Login</button>
            <a href='/' style={{ color: "orange" }}>Go Back Home</a>
          </form>

          {/* ---------------------Sign Up Form ---------------------------*/}
          <form action="#" className="sign-up-form">
            <h2 className="title">Teacher Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Full Name" onChange={(e) => setTeacherName(e.target.value)} />
              {errors.teacherName && <span className="error">{errors.teacherName}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-book"></i>
              <input type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
              {errors.subject && <span className="error">{errors.subject}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="button" className="btn" onClick={handleSignup}>Sign up</button>
            <a href='/' style={{ color: "orange" }}>Go Back Home</a>
          </form>
        </div>
      </div>

      {/* Side Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="authcontent">
            <h3>New to our community?</h3>
            <p>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="authcontent">
            <h3>One of Our Valued Members</h3>
            <p>
              Thank you for being part of our community. Your presence enriches our
              shared experiences. Let's continue this journey together!
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Authpage;
