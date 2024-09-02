import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    const teacherId = teacherData._id;

    fetch(`http://localhost:4000/teacher/assignments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredAssignments = data.filter(
          (assignment) => assignment.teacherId === teacherId
        );
        setAssignments(filteredAssignments);
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const deleteAssignment = (id) => {
    fetch("http://localhost:4000/teacher/deleteAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => {
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
      })
      .catch((error) => console.error("Error deleting assignment:", error));
  };


  return (
    <div className="col-sm-12 col-xl-12">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-4 text-uppercase fs-3">ASSIGNMENTS</h6>
          <Link className="btns btn-primary" to="/AddAssignment">
            ADD ASSIGNMENT
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Assignment Name</th>
              <th scope="col">File</th>
              <th scope="col">Actions</th>
              <th scope="col">View Students</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Assignments added
                </td>
              </tr>
            ) : (
              assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{assignment.assignmentName}</td>
                  <td>
                    <a
                      href={`http://localhost:4000/${assignment.file}`}
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
                      onClick={() => deleteAssignment(assignment._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                  <Link to="/ViewStudentsAssignments" state={{id:assignment._id}} className="btns">
                  View Students 
                  </Link>
                    {/* <button
                      className="btn btn-info"
                      onClick={() => handleViewStudents(assignment._id)}
                    >
                      View Students
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* {selectedAssignment && (
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Students for Assignment</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedAssignment(null)}
                  />
                </div>
                <div className="modal-body">
                  <ul>
                    {students[selectedAssignment]?.length > 0 ? (
                      students[selectedAssignment].map((student, index) => (
                        <li key={index}>{student.name}</li>
                      ))
                    ) : (
                      <p>No students have uploaded this assignment yet.</p>
                    )}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedAssignment(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default AssignmentsList;

































// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function AssignmentsList() {
//   const [assignments, setAssignments] = useState([]);
//   const [refresh, setRefresh] = useState(0);

//   useEffect(() => {
//     const teacherData = JSON.parse(localStorage.getItem("userdata"));
//     const teacherId = teacherData._id;

//     fetch(`http://localhost:4000/teacher/assignments`,{
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: JSON.stringify(params),
//     })
//       .then((res) => res.json())
//       .then((data) =>  {const filteredAssignments = data.filter(assignment => assignment.teacherId === teacherId);
//       setAssignments(filteredAssignments)})
//       .catch((error) => console.error("Error fetching assignments:", error));
//   }, []);

//   const deleteAssignment = (id) => {
//     fetch("http://localhost:4000/teacher/deleteAssignment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         window.location.reload();  // Trigger a refresh
//       })
//       .catch((error) => console.error("Error deleting assignment:", error));
//   };

//   return (
//     <div className="col-sm-12 col-xl-12">
//       <div className="bg-secondary rounded h-100 p-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h6 className="mb-4 text-uppercase fs-3">ASSIGNMENTS</h6>
//           <Link className="btns btn-primary" to="/AddAssignment">
//             ADD ASSIGNMENT
//           </Link>
//         </div>
//         <table className="table table-hover">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Assignment Name</th>
//               <th scope="col">File</th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                   No Assignments added
//                 </td>
//               </tr>
//             ) : (
//               assignments.map((assignment, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{assignment.assignmentName}</td>
//                   <td>
//                     <a href={`http://localhost:4000/${assignment.file}`} target="_blank" rel="noopener noreferrer">
//                       View File
//                     </a>
//                   </td>
//                   <td>
//                     <button
//                       className="btn"
//                       style={{ padding: "5px 20px", background: "red", border: "1px solid darkred" }}
//                       onClick={() => deleteAssignment(assignment._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AssignmentsList;
