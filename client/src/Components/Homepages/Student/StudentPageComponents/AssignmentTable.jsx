import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssignmentTable() {
  const [assignments, setAssignments] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [selectedFiles, setSelectedFiles] = useState({});
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState(""); // State for acknowledgment message
  const navigate = useNavigate();

  useEffect(() => {
    const classId = auth?.classId;

    fetch(`http://localhost:4000/teacher/assignments`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredAssignments = data.filter(
          (assignment) => assignment.classId === classId
        );
        setAssignments(filteredAssignments);
        
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

  const handleFileChange = (assignmentId, event) => {
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [assignmentId]: event.target.files[0],
    }));
  };

  const handleUpload = (assignmentId) => {
    const file = selectedFiles[assignmentId];
    const studentId = auth._id; // Assuming the student's ID is stored in the auth object

    if (!file) {
      toast.error("Please select a file to upload.", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentId", studentId);

    fetch(`http://localhost:4000/student/uploadAssignment/${assignmentId}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message.includes('already uploaded')) {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          toast.success("Assignment uploaded successfully.", {
            position: "top-right",
            autoClose: 1000,
          });
          setSelectedFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            delete updatedFiles[assignmentId];
            return updatedFiles;
          });
        }
      })
      .catch((error) => {
        console.error("Error uploading assignment:", error);
        toast.error("Failed to upload assignment. Please try again.", {
          position: "top-right",
          autoClose: 1000,
        });
      });
  };

  return (
    <div className="section-top-border">
      <h3 className="mb-30 title_color">ASSIGNMENTS</h3>
      
        
    
      <div className="progress-table-wrap">
        <div className="progress-table" style={{backgroundColor:"#fee1cf"}}>
          <div className="table-head">
            <div className="serial">#</div>
            <div className="country">Assignment Name</div>
            <div className="percentage">Actions</div>
            <div className="percentage">Upload Completed Assignment</div>
          </div>
          {assignments.length === 0 ? (
            <div className="table-row">
              <div className="serial"></div>
              <div className="country" colSpan="4">
                No assignments available 
              </div>
            </div>
          ) : (
            assignments.map((assignment, index) => (
              <div className="table-row" style={{backgroundColor:"#fee1cf"}} key={assignment._id}>
                <div className="serial">{index + 1}</div>
                <div className="country">{assignment.assignmentName}</div>
                <div className="percentage">
                  <a
                    className="btn p-3"
                    href={`http://localhost:4000/${assignment.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                </div>
                <div className="percentage">
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AssignmentTable;
