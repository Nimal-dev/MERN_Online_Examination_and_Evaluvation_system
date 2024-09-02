import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../../Common/Sidebar";
import Navbar from "../../../../Common/Navbar";

function AddStudent() {
  const [studentName, setStudentName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;
    fetch(`http://localhost:4000/teacher/classes?teacherId=${teacherId}`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const validateForm = () => {
    const formErrors = {};
    if (!studentName.trim()) formErrors.studentName = "Student Name is required";
    if (!email.trim()) formErrors.studentEmail = "Email is required";
    if (!password.trim()) formErrors.password = "Password Name is required";
    if (!admissionNumber.trim()) formErrors.admissionNumber = "Admission Number is required";
    if (!classId) formErrors.classId = "Class must be selected";
    return formErrors;
  };

  const RegisterStudent = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const params = {
      studentName,
      classId,
      admissionNumber,
      email,
      password,
      usertype: 2,
    };

    fetch("http://localhost:4000/teacher/AddStudent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Student added successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
        setStudentName("");
        setAdmissionNumber("");
        setEmail("");
        setPassword("");
        setClassId("");
        setErrors({});
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding Student:", error);
        toast.error("Failed to add Student. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <Sidebar />
      <div class="content">
        <Navbar />
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <h3>ADD STUDENT</h3>
                  </div>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                      style={{minWidth:"400px"}}
                        type="text"
                        className="form-control text-white"
                        id="studentNameInput"
                        placeholder="Student Name"
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                      />
                      <label htmlFor="studentNameInput">Student Name</label>
                      {errors.studentName && (
                        <small className="text-danger">{errors.studentName}</small>
                      )}
                    </div>
                    <div className="form-floating  mb-3">
                      <input
                      style={{minWidth:"400px"}}
                        type="text"
                        className="form-control text-white"
                        id="admissionNumberInput"
                        placeholder="Admission Number"
                        value={admissionNumber}
                        onChange={(event) => setAdmissionNumber(event.target.value)}
                      />
                      <label htmlFor="admissionNumberInput">Admission Number</label>
                      {errors.admissionNumber && (
                        <small className="text-danger">{errors.admissionNumber}</small>
                      )}
                    </div>
                    <div className="form-floating mb-3" style={{minWidth:"400px"}}>
                      <select
                        className="form-control text-white"
                        id="classIdSelect"
                        value={classId}
                        onChange={(event) => setClassId(event.target.value)}
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls._id}>
                            {cls.classname}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="classIdSelect">Class</label>
                      {errors.classId && (
                        <small className="text-danger">{errors.classId}</small>
                      )}
                    </div>


                    <div className="form-floating mb-3" style={{minWidth:"400px"}}>
                      <input
                        type="email"
                        className="form-control text-white"
                        id="studentEmailInput"
                        placeholder="Student Email"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label htmlFor="studentEmailInput">Student Email</label>
                      {errors.Email && (
                        <small classEmail="text-danger">{errors.Email}</small>
                      )}
                    </div>


                    <div className="form-floating mb-3" style={{minWidth:"400px"}}>
                      <input
                        type="password"
                        className="form-control text-white"
                        id="PasswordInput"
                        placeholder="Password"
                        
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label htmlFor="PasswordInput">Password</label>
                      {errors.studentName && (
                        <small className="text-danger">{errors.studentName}</small>
                      )}
                    </div>
                    <button
                    style={{minWidth:"400px"}}
                      type="button"
                      className="btn btn-primary py-3 w-20 mb-4"
                      onClick={RegisterStudent}
                    >
                      <strong>CREATE</strong>
                      <i className="fa fa-plus"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddStudent;
