import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ClassList() {
  const [classes, setClass] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = JSON.parse(localStorage.getItem("userdata"));
    if (!teacherData) {
      console.error("No teacher data found");
      return;
    }

    const teacherId = teacherData._id;

    fetch(`http://localhost:4000/teacher/classes?teacherId=${teacherId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setClass(data))
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  }, [refresh]);

  const deleteClass = (id) => {
    fetch("http://localhost:4000/admin/deleteClass", {
      method: "POST",
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
        console.error("Error deleting state:", error);
      });
  };

  return (
    <div className="col-sm-12 col-xl-4">
      <div className="bg-secondary rounded h-100 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="mb-4 text-uppercase fs-3">class</h6>
          <Link className="btns btn-primary" to="/AddClass">
            ADD CLASS
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Class</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Classes added
                </td>
              </tr>
            ) : (
              classes.map((classItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{classItem.classname}</td>
                  <td>
                    <button
                      className="btn btn-danger ms-1"
                      
                      onClick={() => deleteClass(classItem._id)}
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

export default ClassList;
