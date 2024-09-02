import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../../Common/Sidebar";
import Navbar from "../../../../Common/Navbar";

function AddClass() {
  const [classname, setClassName] = useState("");
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const teacherData = JSON.parse(localStorage.getItem("userdata"));
  const teacherId = teacherData._id;
  console.log('=============================')  
  console.log(teacherId)
  console.log('=============================')

  const validateForm = () => {
    const formErrors = {};
    if (!classname.trim()) formErrors.classname = "Class Name is required";
    return Object.keys(formErrors).length === 0;
  };
  

  const RegisterClass = () => {
    if (!validateForm()) return;

    const params = {
      classname: classname,
      teacherId: teacherId
    };

    fetch("http://localhost:4000/teacher/AddClass", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        // Show success message
        toast.success("Class added successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
        // Clear form fields after successful submission
        setClassName("");
        setErrors({});
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      })
      .catch((error) => {
        console.error("Error adding Class:", error);
        // Show error message
        toast.error("Failed to add Class. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
     <Sidebar/>
    <div class="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h3>ADD CLASS</h3>
              </div>
              <form>
                {/*------------------------- Teacher Name Input ---------------------------------*/}
                <div className="form-floating mb-3" style={{minWidth:"500px"}}>
                  <input
                  
                    type="text"
                    className="form-control text-white"
                    id="classNameInput"
                    placeholder="Class Name"
                    onChange={(event) => setClassName(event.target.value)}
                  />
                  <label htmlFor="classNameInput">Class Name</label>
                  {errors.classname && (
                    <small className="text-danger">{errors.classname}</small>
                  )}
                </div>

                {/*------------------------- SUBMIT BUTTON ---------------------------------*/}
                <button
               
                  type="button"
                  className="btn btn-primary py-3 w-50 mb-4"
                  onClick={RegisterClass}
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

export default AddClass;
