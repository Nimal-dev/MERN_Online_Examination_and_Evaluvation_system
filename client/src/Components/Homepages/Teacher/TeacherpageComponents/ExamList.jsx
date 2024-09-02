import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ExamList() {
  const [exams, setExams] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;
  
    fetch(`http://localhost:4000/teacher/exams?teacherId=${teacherId}`)
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, [refresh]);

  const deleteExam = (id) => {
    fetch("http://localhost:4000/teacher/deleteExam", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1); // Trigger a refresh
      })
      .catch((error) => {
        console.error("Error deleting exam:", error);
      });
  };

  return (
    <div className="col-sm-12 col-xl-12">
    <div className="bg-secondary rounded h-100 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="mb-4 text-uppercase fs-3">EXAMS</h6>
        <Link className="btns btn-primary" to="/AddExam">
          ADD EXAM
        </Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Examination Name</th>
            <th scope="col">Class</th>
            <th scope="col">Date of Exam</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Exams added
              </td>
            </tr>
          ) : (
            exams.map((exam, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exam.examName}</td>
                <td>{exam.classId.classname}</td>
                <td>{new Date(exam.dateOfExam).toLocaleDateString()}</td>
                <td>{exam.startTime}</td>
                <td>{exam.endTime}</td>
                <td>
                  <Link to="/ViewStudentAnswers" state={{id:exam._id}} className="btns">
                    RESULTS 
                  </Link>
                  
                  <button 
                    className="btn"
                    style={{ padding: "5px 20px", background: "red", border: "1px solid darkred" }}
                    onClick={() => deleteExam(exam._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default ExamList;
