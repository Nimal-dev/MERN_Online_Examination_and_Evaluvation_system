import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TeacherAssessmentPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/student/examDetails?examId=${examId}`)
      .then((res) => res.json())
      .then((data) => setExam(data))
      .catch((error) => console.error("Error fetching exam details:", error));
  }, [examId]);

  const handleMarkChange = (studentId, marks) => {
    setExam((prevExam) => ({
      ...prevExam,
      studentAnswers: prevExam.studentAnswers.map((answer) =>
        answer.studentId === studentId ? { ...answer, marks } : answer
      ),
    }));
  };

  const handleSubmitMarks = (studentId, marks) => {
    fetch("http://localhost:4000/teacher/updateMarks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ examId, studentId, marks }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("Marks updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
      });
  };

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="assessment-page">
      <h2>{exam.examName}</h2>
      {exam.studentAnswers.map((answer, index) => (
        <div key={index} className="student-answer">
          <h4>Student ID: {answer.studentId}</h4>
          {exam.questions.map((question, qIndex) => (
            <div key={qIndex} className="question">
              <h5>{question.questionText}</h5>
              <p>Answer: {answer.answers[qIndex]}</p>
              <p>Correct Answer: {question.correctOption}</p>
            </div>
          ))}
          <div className="marks">
            <input
            
              type="number"
              value={answer.marks}
              onChange={(e) => handleMarkChange(answer.studentId, e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitMarks(answer.studentId, answer.marks)}
            >
              Submit Marks
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherAssessmentPage;
