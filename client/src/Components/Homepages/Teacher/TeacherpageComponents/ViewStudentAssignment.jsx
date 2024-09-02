import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../Common/Sidebar';
import Navbar from '../../../Common/Navbar';
import { useLocation } from 'react-router-dom';

function ViewStudentAssignment() {
    const location = useLocation();
    const assignmentId = location.state.id;

    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/teacher/studentAssignmentAnswers/${assignmentId}`)
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, [assignmentId]);

    return (
        <>
            <Sidebar />
            <div className="content">
                <Navbar />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-12">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4 text-uppercase fs-3">Assignment Results</h6>

                                {students.length === 0 ? (
                                    <p className="text-center">
                                        No students have attended this exam.
                                    </p>
                                ) : (
                                    students.studentFiles.map((student, index) => (
                                        <div key={index} className="mb-4">
                                            <p style={{ color: "white" }}>
                                                <b>Student Name:</b> {student.studentId.studentName}
                                            </p>
                                            <div style={{ color: "white" }}>
                                                <b>Uploaded File:</b>
                                            </div>
                                            <div style={{ border: '1px solid #ccc', marginBottom: '15px' }}>
                                                <embed 
                                                    src={`http://localhost:4000/${student.assignments}`} 
                                                    type="application/pdf" 
                                                    width="100%" 
                                                    height="550px"
                                                />
                                            </div>
                                            {/* <p style={{ color: "white" }}>
                                                <b>Marks:</b> {student.marks}
                                            </p>
                                            <div className="form-group">
                                                <label style={{ color: "white" }}><b>Feedback:</b></label>
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3" 
                                                    placeholder="Enter feedback here"
                                                    value={student.feedback || ""}
                                                    readOnly
                                                ></textarea>
                                            </div> */}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewStudentAssignment;









// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Sidebar from '../../../Common/Sidebar';
// import Navbar from '../../../Common/Navbar';
// import { useLocation } from 'react-router-dom';

// function ViewStudentAssignment() {
//     const location = useLocation();
//   const assignmentId = location.state.id;

//   const [students, setStudents] = useState([]);
// const navigate = useNavigate();
//   useEffect(() => {
//     fetch(`http://localhost:4000/teacher/studentAssignmentAnswers/${assignmentId}`)
//       .then((res) => res.json())
//       .then((data) => setStudents(data))
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//       });
//   }, []);
//   return (
//     <>
//     <Sidebar/>
//     <div class="content">
//       <Navbar/>
//       <div class="container-fluid pt-4 px-4">
//         <div class="row g-4">
//     <div className="col-sm-12 col-xl-12">
//       <div className="bg-secondary rounded h-100 p-4">
//         <h6 className="mb-4 text-uppercase fs-3">Assignment Results</h6>
        
          
//             {students.length === 0 ? (
              
//                 <p colSpan="3" className="text-center">
//                   No students have attended this exam
//                 </p>
              
//             ) : (
//               students.studentFiles.map((student, index) => (
                
                  
//                   <p style={{color:"white"}}><b>Student Name:</b> {student.studentId.studentName}</p>

                  
                
//               ))
//             )}
          

//       </div>
//     </div>
//     </div>
//     </div>
//     </div>
//               </>
//   )
// }

// export default ViewStudentAssignment