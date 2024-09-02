// ViewStudentAnswers.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation} from "react-router-dom";
import Sidebar from "../../../Common/Sidebar";
import Navbar from "../../../Common/Navbar";





function ViewStudentAnswers() {
  const location = useLocation();
  const examId =  location.state.id;
  // const { examId } = useParams();
  const [students, setStudents] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:4000/teacher/examStudents/${examId}`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);
  
  
  // const handleViewAnswers = (studentId) => {
  //   navigate(`/EvaluvateStudent/${studentId}`, );
  // };

  return (
    <>
    <Sidebar/>
    <div class="content">
      <Navbar/>
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
    <div className="col-sm-12 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <h6 className="mb-4 text-uppercase fs-3">Exam Results</h6>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No students have attended this exam
                </td>
              </tr>
            ) : (
              students.studentAnswers.map((student, index) => (
                <tr key={index}> 
                  <td>{index + 1}</td>
                  <td>{student.studentId.studentName}</td>
                  <td>
                    <Link to="/ViewAnswers" state={{id:examId}}>
                    <button 
                      className="btn btn-primary"
                    >
                      View Answers
                    </button>
                    </Link>
                   
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
              </>
    
  );
}

export default ViewStudentAnswers;
