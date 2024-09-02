import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../../Common/Sidebar";
import Navbar from "../../../../Common/Navbar";

function AddPreviousQuestionPaper() {
  const [questionpaperName, setQuestionName] = useState("");
  const [file, setFile] = useState(null);
  const [classId, setClassId] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);

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
    if (!questionpaperName.trim()) formErrors.questionpaperName = "Assignment Name is required";
    if (!file) formErrors.file = "PDF file is required";
    if (!classId) formErrors.classId = "Class must be selected";
    return formErrors;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addQuestionPaper = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    const formData = new FormData();
    formData.append("questionpaperName", questionpaperName);
    formData.append("file", file);
    formData.append("classId", classId);
    formData.append("teacherId", teacherId);

    fetch("http://localhost:4000/teacher/AddpreviousQuestionPaper", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Question paper added successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
        setQuestionName("");
        setFile(null);
        setClassId("");
        setErrors({});
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding question paper:", error);
        toast.error("Failed to add question paper. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div
              className="row h-100 align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="col-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h3 className="mb-4 text-center text-uppercase fs-1">
                    Add Previous Question Paper
                  </h3>
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        style={{ minWidth: "400px" }}
                        type="text"
                        className="form-control text-white"
                        placeholder="Question Paper Name"
                        value={questionpaperName}
                        onChange={(e) => setQuestionName(e.target.value)}
                      />
                      <label>Name</label>
                      {errors.questionpaperName && (
                        <small className="text-danger">
                          {errors.questionpaperName}
                        </small>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        style={{ minWidth: "400px" }}
                        type="file"
                        className="form-control text-white mt-2"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                      <label>Upload PDF</label>
                      {errors.file && (
                        <small className="text-danger">
                          {errors.file}
                        </small>
                      )}
                    </div>
                    <div className="form-floating mb-3" style={{ minWidth: "400px" }}>
                      <select
                        className="form-control text-white"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls._id}>
                            {cls.classname}
                          </option>
                        ))}
                      </select>
                      <label>Select Class</label>
                      {errors.classId && (
                        <small className="text-danger">
                          {errors.classId}
                        </small>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                      style={{minWidth:"400px"}}
                        type="button"
                        className="btn btn-primary text-white"
                        onClick={addQuestionPaper}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPreviousQuestionPaper;
