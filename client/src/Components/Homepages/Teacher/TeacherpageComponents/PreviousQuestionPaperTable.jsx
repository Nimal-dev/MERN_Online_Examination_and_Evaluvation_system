import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../Common/Sidebar";
import Navbar from "../../../Common/Navbar";

function PreviousQuestionPaperTable() {
  const [questionpapers, setQuestionpapers] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    fetch(`http://localhost:4000/teacher/getPreviousquestions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredQuestions = data.filter(
          (data) => data.teacherId._id === teacherId
        );
        setQuestionpapers(filteredQuestions);
      })
      .catch((error) => console.error("Error fetching Question papers:", error));
  }, []);

  const deleteQuestionpaper = (id) => {
    fetch("http://localhost:4000/teacher/deletePreviousquestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => {
        setQuestionpapers(questionpapers.filter((questionpapers) => questionpapers._id !== id));
      })
      .catch((error) => console.error("Error deleting Question paper:", error));
  };

  return (
    <>
    <Sidebar />
    <div className="content">
      <Navbar />
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
    <div className="col-sm-12 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-4 text-uppercase fs-3">PREVIOUS QUESTION PAPERS</h6>
          <Link className="btns btn-primary" to="/AddPreviousQuestionpaper">
            ADD PREV. PAPER
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">File</th>
              <th scope="col">Actions</th>
              {/* <th scope="col">View Students</th> */}
            </tr>
          </thead>
          <tbody>
            {questionpapers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No question papers added
                </td>
              </tr>
            ) : (
                questionpapers.map((questionpaper, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{questionpaper.questionpaperName}</td>
                  <td>
                    <a
                    className="btns"
                      href={`http://localhost:4000/${questionpaper.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn"
                      style={{ padding: "5px 20px", background: "red", border: "1px solid darkred" }}
                      onClick={() => deleteQuestionpaper(questionpaper._id)}
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
    </div>
    </div>
    </div>
    </>
  );
}

export default PreviousQuestionPaperTable;