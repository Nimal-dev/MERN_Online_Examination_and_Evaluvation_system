import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TeachersList() {
    const [teacher, setTeacher] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch("http://localhost:4000/admin/viewTeacher")
        .then((res) => res.json())
        .then((result) => {
          console.log(result, "aserdtfgh");
          setTeacher(result);
        })
        .catch((error) => {
          console.error("Error fetching teacher:", error);
        });
    }, [refresh]);
  
    const deleteTeacher = (id) => {
      fetch("http://localhost:4000/admin/deleteTeacher", {
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
          toast.success("Teacher deleted successfully!");
          setRefresh(refresh + 1); // Refresh the teacher list
        })
        .catch((error) => {
          console.error("Error deleting Teacher:", error);
          toast.error("Error deleting teacher.");
        });
    };
    
  
    return (
      <div className="col-sm-12 col-xl-12">
        <div className="bg-secondary rounded h-100 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="mb-4 fs-2">Teachers List</h6>
            <Link className="btn btn-primary" to="/Teachers">
              ADD TEACHER
            </Link>
          </div>
          <table className="table table-hover text-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Teacher Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacher.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Teachers are registered.
                  </td>
                </tr>
              ) : (
                teacher.map((teacher, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{teacher.teacherName}</td>
                    <td>{teacher.authid.email}</td>
                    <td>{teacher.address}</td>
                    <td>{teacher.contact}</td>
                    <td>
                      <Link to="/EditTeacher" state={{ id: teacher._id }}>
                        <button className="btns btn-success" style={{ padding: "5px 20px" }}>
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btns  btn-danger ms-1" style={{ padding: "5px 20px" }}
                        onClick={() => deleteTeacher(teacher._id)}
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
        <ToastContainer />
      </div>
    );
  }

export default TeachersList