import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../../Common/Sidebar";
import Navbar from "../../../../Common/Navbar";

function AddExam() {
  const [examName, setExamName] = useState("");
  const [classId, setClassId] = useState("");
  const [dateOfExam, setDateOfExam] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""] },
  ]);
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
    if (!examName.trim()) formErrors.examName = "Exam Name is required";
    if (!classId) formErrors.classId = "Class must be selected";
    if (!dateOfExam.trim()) formErrors.dateOfExam = "Date of Exam is required";
    if (!startTime.trim()) formErrors.startTime = "Start Time is required";
    if (!endTime.trim()) formErrors.endTime = "End Time is required";
    questions.forEach((q, index) => {
      if (!q.questionText.trim())
        formErrors[`question${index}`] = "Question text is required";
      q.options.forEach((option, optIndex) => {
        if (!option.trim())
          formErrors[`option${index}${optIndex}`] = "All options are required";
      });
    });
    return formErrors;
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""] },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const registerExam = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    const params = {
      message: "New Exam has been Added",
      examName,
      classId,
      dateOfExam,
      startTime,
      endTime,
      questions,
      teacherId,
    };

    fetch("http://localhost:4000/teacher/AddExam", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success("Exam added successfully.", {
          position: "top-right",
          autoClose: 1000,
        });
        setExamName("");
        setClassId("");
        setDateOfExam("");
        setStartTime("");
        setEndTime("");
        setQuestions([{ questionText: "", options: ["", "", "", ""] }]);
        setErrors({});
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error adding Exam:", error);
        toast.error("Failed to add Exam. Please try again.", {
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
                    Add Exam
                  </h3>
                  <form>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control text-white"
                                placeholder="Examination Name"
                                value={examName}
                                onChange={(e) => setExamName(e.target.value)}
                              />
                              <label>Examination Name</label>
                              {errors.examName && (
                                <small className="text-danger">
                                  {errors.examName}
                                </small>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="form-floating mb-3"style={{backgroundColor:'black'}}>
                              <select
                                className="form-control text-white"
                                value={classId}
                                onChange={(e) => setClassId(e.target.value)}
                              >
                                <option value="">Select Class</option>
                                {classes.map((classData, index) => (
                                  <option key={index} value={classData._id}>
                                    {classData.classname}
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
                          </td>
                          <td>
                            <div className="form-floating mb-3">
                              <input
                                type="date"
                                className="form-control text-white"
                                placeholder="Date of Exam"
                                value={dateOfExam}
                                min={getCurrentDate()}
                                onChange={(e) => setDateOfExam(e.target.value)}
                              />
                              <label>Date of Exam</label>
                              {errors.dateOfExam && (
                                <small className="text-danger">
                                  {errors.dateOfExam}
                                </small>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="form-floating mb-3">
                              <input
                                type="time"
                                className="form-control text-white"
                                placeholder="Start Time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                              />
                              <label>Start Time</label>
                              {errors.startTime && (
                                <small className="text-danger">
                                  {errors.startTime}
                                </small>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="form-floating mb-3">
                              <input
                                type="time"
                                className="form-control text-white"
                                placeholder="End Time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                              />
                              <label>End Time</label>
                              {errors.endTime && (
                                <small className="text-danger">
                                  {errors.endTime}
                                </small>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table table-striped ">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Option 1</th>
                          <th>Option 2</th>
                          <th>Option 3</th>
                          <th>Option 4</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((question, qIndex) => (
                          <tr key={qIndex}>
                            <td>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control text-white"
                                  placeholder="Question Text"
                                  value={question.questionText}
                                  onChange={(e) =>
                                    handleQuestionChange(
                                      qIndex,
                                      "questionText",
                                      e.target.value
                                    )
                                  }
                                />
                                <label>Question</label>
                                {errors[`question${qIndex}`] && (
                                  <small className="text-danger">
                                    {errors[`question${qIndex}`]}
                                  </small>
                                )}
                              </div>
                            </td>
                            {question.options.map((option, optIndex) => (
                              <td key={optIndex}>
                                <div className="form-floating  mb-3">
                                  <input
                                    type="text"
                                    className="form-control text-white"
                                    placeholder={`Option ${optIndex + 1}`}
                                    value={option}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        qIndex,
                                        optIndex,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <label>Option {optIndex + 1}</label>
                                  {errors[`option${qIndex}${optIndex}`] && (
                                    <small className="text-danger">
                                      {errors[`option${qIndex}${optIndex}`]}
                                    </small>
                                  )}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={addQuestion}
                      >
                        Add Question
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={registerExam}
                      >
                        Register
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

export default AddExam;
