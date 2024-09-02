import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../Common/Sidebar';
import Navbar from '../../../Common/Navbar';
import { useLocation } from 'react-router-dom';

function ViewAnswers() {
  const location = useLocation();
  const examId = location.state.id;
  const [examdata, setExamData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [marks, setMarks] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/teacher/examStudents/${examId}`)
      .then((res) => res.json())
      .then((data) => {
        setExamData(data);
        if (data.studentAnswers && data.studentAnswers.length > 0) {
          setStudentData(data.studentAnswers[0]); // Assuming the first student's answers
        }
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
      });
  }, [examId]);

  const handleMarkChange = (questionIndex, isCorrect) => {
    setCorrectAnswers({
      ...correctAnswers,
      [questionIndex]: isCorrect,
    });
  };

  const handleMarksChange = (event) => {
    setMarks(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitAssessment = () => {
    const assessmentData = {
      examId,
      studentId: studentData.studentId._id,
      marks,
      feedback,
    };

    // Submit the assessment data to the backend
    fetch(`http://localhost:4000/teacher/submitMarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assessmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Results Submitted")
        navigate(-1)
        console.log("Assessment submitted:", data);
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
      });
  };

  if (!examdata || !studentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4 text-uppercase fs-3">Exam: {examdata.examName}</h6>
                <h6 className="mb-4 text-uppercase fs-4">Student: {studentData.studentId.studentName}</h6>
                <div className="exam-questions">
                  {examdata.questions.map((question, questionIndex) => (
                    <>
                    <div key={questionIndex} className="question mb-3 text-white">

                      <p><strong>Question {questionIndex + 1}:</strong> {question.questionText}</p>
                      <p><strong>Answer:</strong> {question.options[studentData.answers[questionIndex]]}</p>
                      <div className="d-flex align-items-center mb-2">
                        <label className="me-2">Mark as:</label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`correct${questionIndex}`}
                            value="correct"
                            onChange={() => handleMarkChange(questionIndex, true)} />
                          <label className="form-check-label">Correct</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`correct${questionIndex}`}
                            value="incorrect"
                            onChange={() => handleMarkChange(questionIndex, false)} />
                          <label className="form-check-label">Incorrect</label>
                        </div>
                      </div>

                    </div>
                    
                    </>
                    
                  ))}
                 
                  
                </div>
                <div className="mb-3">
                  <label className="form-label">Marks:</label>
                  <input
                    type="number"
                    className="form-control text-white"
                    value={marks}
                    onChange={handleMarksChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Feedback:</label>
                  <textarea
                    className="form-control text-white"
                    value={feedback}
                    onChange={handleFeedbackChange}
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitAssessment}
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAnswers;














// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../../Common/Sidebar';
// import Navbar from '../../../Common/Navbar';
// import { useLocation } from 'react-router-dom';

// function ViewAnswers() {
//   const location = useLocation();
//   const examId = location.state.id;
//   const [examdata, setExamData] = useState(null);
//   const [studentData, setStudentData] = useState(null);
//   const [marks, setMarks] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [correctAnswers, setCorrectAnswers] = useState({});

//   useEffect(() => {
//     fetch(`http://localhost:4000/teacher/examStudents/${examId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setExamData(data);
//         if (data.studentAnswers && data.studentAnswers.length > 0) {
//           setStudentData(data.studentAnswers[0]); // Assume you want the first student's answers
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//       });
//   }, [examId]);

//   const handleMarkChange = (questionIndex, isCorrect) => {
//     setCorrectAnswers({
//       ...correctAnswers,
//       [questionIndex]: isCorrect,
//     });
//   };

//   const handleMarksChange = (event) => {
//     setMarks(event.target.value);
//   };

//   const handleFeedbackChange = (event) => {
//     setFeedback(event.target.value);
//   };

//   const handleSubmitAssessment = () => {
//     const assessmentData = {
//       examId,
//       studentId: studentData.studentId._id,
//       correctAnswers,
//       marks,
//       feedback,
//     };

//     // Submit the assessment data to the backend
//     fetch(`http://localhost:4000/teacher/submitAssessment`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(assessmentData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Assessment submitted:", data);
//       })
//       .catch((error) => {
//         console.error("Error submitting assessment:", error);
//       });
//   };

//   if (!examdata || !studentData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Sidebar />
//       <div className="content">
//         <Navbar />
//         <div className="container-fluid pt-4 px-4">
//           <div className="row g-4">
//             <div className="col-sm-12 col-xl-12">
//               <div className="bg-secondary rounded h-100 p-4">
//                 <h6 className="mb-4 text-uppercase fs-3">Exam: {examdata.examName}</h6>
//                 <h6 className="mb-4 text-uppercase fs-4">Student: {studentData.studentId.studentName}</h6>
//                 <div className="exam-questions">
//                   {examdata.questions.map((question, questionIndex) => (
//                     <div key={questionIndex} className="question mb-3">
//                       <p><strong>Question {questionIndex + 1}:</strong> {question.questionText}</p>
//                       <p><strong>Answer:</strong> {question.options[studentData.answers[questionIndex]]}</p>
//                       <div className="d-flex align-items-center mb-2">
//                         <label className="me-2">Mark as:</label>
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`correct${questionIndex}`}
//                             value="correct"
//                             onChange={() => handleMarkChange(questionIndex, true)}
//                           />
//                           <label className="form-check-label">Correct</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`correct${questionIndex}`}
//                             value="incorrect"
//                             onChange={() => handleMarkChange(questionIndex, false)}
//                           />
//                           <label className="form-check-label">Incorrect</label>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Marks:</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={marks}
//                     onChange={handleMarksChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Feedback:</label>
//                   <textarea
//                     className="form-control"
//                     value={feedback}
//                     onChange={handleFeedbackChange}
//                   />
//                 </div>
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleSubmitAssessment}
//                 >
//                   Submit Assessment
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewAnswers;
