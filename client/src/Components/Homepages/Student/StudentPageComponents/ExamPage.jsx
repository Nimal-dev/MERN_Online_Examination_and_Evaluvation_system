import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../Common/Sidebar";
import Navbar from "../../../Common/Navbar";
import StudentHeader from "../Common/StudentHeader";
import BannerArea from "./BannerArea";
import ExamBanner from "./ExamBanner";
// import "./ExamPage.css"; // Assuming you create a CSS file for specific styles

function ExamPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/student/exam/${examId}`)
      .then((res) => res.json())
      .then((data) => setExam(data))
      .catch((error) => console.error("Error fetching exam:", error));
  }, [examId]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex.toString(),
    });
  };

  const handleSubmit = () => {
    const param = {
      studentId: JSON.parse(localStorage.getItem("userdata"))._id,
      examId,
      answers: Object.values(answers),
    };

    fetch(`http://localhost:4000/student/submitExam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Exam submitted:", data);
        navigate("/studenthome");
      })
      .catch((error) => console.error("Error submitting exam:", error));
  };

  if (!exam) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
       <StudentHeader/>
       <ExamBanner/>
            <div className="exam-page">
              <h2 className="exam-title" style={{color:"black"}}>{exam.examName}</h2>
              <form className="exam-form">
                {exam.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="card mb-3 question">
                    <div className="card-body"style={{minWidth:"500px"}}>
                      <p className="card-text" ><b style={{color:"black"}}>{questionIndex+1}.{question.questionText}?</b></p>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name={`question${questionIndex}`}
                            value={optionIndex}
                            checked={answers[questionIndex] === optionIndex.toString()}
                            onChange={() => handleOptionChange(questionIndex, optionIndex)}
                          />
                          <label className="form-check-label">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          
    </>
  );
}

export default ExamPage;












// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../../../Common/Sidebar";
// import Navbar from "../../../Common/Navbar";

// function ExamPage() {
//   const { examId } = useParams();
//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`http://localhost:4000/student/exam/${examId}`)
//       .then((res) => res.json())
//       .then((data) => setExam(data))
//       .catch((error) => console.error("Error fetching exam:", error));
//   }, [examId]);

//   const handleOptionChange = (questionIndex, optionIndex) => {
//     setAnswers({
//       ...answers,
//       [questionIndex]: optionIndex.toString(),
//     });
//   };

//   const handleSubmit = () => {
//     const param = {
//       studentId: JSON.parse(localStorage.getItem("userdata"))._id,
//       examId,
//       answers: Object.values(answers), // Convert answers to an array of strings
//     };

//     fetch(`http://localhost:4000/student/submitExam`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(param),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Exam submitted:", data);
//         navigate("/studenthome"); // Redirect to the exam list or result page
//       })
//       .catch((error) => console.error("Error submitting exam:", error));
//   };

//   if (!exam) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <Sidebar />
//     <div className="content">
//       <Navbar />
//       <div className="container-fluid pt-4 px-4">
//         <div className="row g-4">
//     <div className="exam-page">
//       <h2>{exam.examName}</h2>
//       <form>
//         {exam.questions.map((question, questionIndex) => (
//           <div key={questionIndex} className="question">
//             <p>{question.questionText}</p>
//             {question.options.map((option, optionIndex) => (
//               <div key={optionIndex}>
//                 <label>
//                   <input
//                     type="radio"
//                     name={`question${questionIndex}`}
//                     value={optionIndex}
//                     checked={answers[questionIndex] === optionIndex.toString()}
//                     onChange={() => handleOptionChange(questionIndex, optionIndex)}
//                   />
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         ))}
//         <button type="button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//     </div>
//     </div>
//     </div>
//     </>
//   );
// }

// export default ExamPage;
