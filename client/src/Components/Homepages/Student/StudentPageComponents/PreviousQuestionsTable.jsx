import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PreviousQuestionsTable() {
  const [questionpapers, setQuestionPapers] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState(""); // State for acknowledgment message
  const navigate = useNavigate();

  useEffect(() => {
    const classId = auth?.classId;

    fetch(`http://localhost:4000/teacher/getPreviousquestions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredAssignments = data.filter(
          (questionpapers) => questionpapers.classId === classId
        );
        setQuestionPapers(filteredAssignments);
        
        // Update acknowledgment message
        setAcknowledgmentMessage("New Assignments are added");
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments. Please try again later.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  }, [auth]);



  return (
    <div className="section-top-border">
      <h3 className="mb-30 title_color">PREVIOUS QUESTION PAPERS</h3>
      {/* {acknowledgmentMessage && (
        <div style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "10px" }}>
          {acknowledgmentMessage} 
        </div>
      )}*/}
      <div className="progress-table-wrap">
        <div className="progress-table" style={{backgroundColor:"#e5e7e9", alignItems:"center", alignContent:"center"}}>
          <div className="table-head">
            <div className="serial">#</div>
            <div className="country"> Name</div>
            <div className="country"> Uploaded by</div>
            <div className="country"> Subject</div>
            <div className="percentage">Actions</div>
            {/* <div className="percentage">Upload Completed Assignment</div> */}
          </div>
          {questionpapers.length === 0 ? (
            <div className="table-row">
              <div className="serial"></div>
              <div className="country" colSpan="4">
                No Question Papers available 
              </div>
            </div>
          ) : (
            questionpapers.map((questionpaper, index) => (
              <div className="table-row"  key={questionpaper._id}>
                <div className="serial">{index + 1}</div>
                <div className="country">{questionpaper.questionpaperName}</div>
                <div className="country">{questionpaper.teacherId.teacherName}</div>
                <div className="country">{questionpaper.teacherId.subject}</div>
                <div className="percentage">
                  <a
                    className="btn p-3"
                    href={`http://localhost:4000/${questionpaper.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                </div>
                {/* <div className="percentage">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(assignment._id, e)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpload(assignment._id)}
                  >
                    Upload
                  </button>
                </div> */}
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PreviousQuestionsTable;
