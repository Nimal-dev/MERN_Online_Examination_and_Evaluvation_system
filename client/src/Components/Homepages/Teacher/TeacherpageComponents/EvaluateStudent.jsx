import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function EvaluateStudent() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const examId = params.get("examId");
  const studentId = params.get("studentId");
  
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/teacher/exam/${examId}/student/${studentId}/answers`)
      .then((res) => res.json())
      .then((data) => setStudentAnswers(data))
      .catch((error) => console.error("Error fetching student answers:", error));
  }, [examId, studentId]);

  const handleMarksChange = (questionIndex, event) => {
    setMarks({
      ...marks,
      [questionIndex]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const param = {
      examId,
      studentId,
      marks,
    };

    fetch(`http://localhost:4000/teacher/submitMarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Marks submitted:", data);
        alert("Marks submitted successfully");
      })
      .catch((error) => console.error("Error submitting marks:", error));
  };

  return (
    <div className="evaluate-student">
      <h2>Evaluate Student Answers</h2>
      {studentAnswers.map((answer, index) => (
        <div key={index} className="question">
          <p>{answer.questionText}</p>
          <p>Student's Answer: {answer.studentAnswer}</p>
          <label>
            Marks:
            <input
            
              type="number"
              value={marks[index] || ""}
              onChange={(e) => handleMarksChange(index, e)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>
        Submit Marks
      </button>
    </div>
  );
}

export default EvaluateStudent;
