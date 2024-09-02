import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ExamTable() {
  const [exams, setExams] = useState([]);
  const [previousExams, setPreviousExams] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState(""); // State for acknowledgment message
  const navigate = useNavigate();

  useEffect(() => {
    const param = {
      id: auth.classId,
    };

    fetch(`http://localhost:4000/student/examDetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((data) => {
        const previousExamsCount = previousExams.length;
        const currentExamsCount = data.length;

        // Check if there are new exams
        if (currentExamsCount > previousExamsCount) {
          if (!sessionStorage.getItem("examNotificationShown")) {
            setAcknowledgmentMessage("A new exam has been added");
            sessionStorage.setItem("examNotificationShown", "true");
          }
        }

        setPreviousExams(exams); // Store the previous exams before updating
        setExams(data);
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });
  }, [auth]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });
  };

  const isExamActive = (dateOfExam, startTime, endTime) => {
    const examDate = new Date(dateOfExam);
    const currentDate = new Date();

    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");

    const examStartTime = new Date(examDate);
    examStartTime.setHours(startHours, startMinutes, 0, 0);

    const examEndTime = new Date(examDate);
    examEndTime.setHours(endHours, endMinutes, 0, 0);

    return currentDate >= examStartTime && currentDate <= examEndTime;
  };

  const handleStartExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="section-top-border" id="exam">
      <h3 className="mb-30 title_color">EXAMS</h3>
      
      <div className="progress-table-wrap" >
        <div className="progress-table">
          <div className="table-head">
            <div className="serial">#</div>
            <div className="country">Exam Name</div>
            <div className="visit">Exam Date</div>
            <div className="visit">Start Time</div>
            <div className="visit">End Time</div>
            <div className="percentage">Actions</div>
          </div>
          {exams.length === 0 ? (
            <div className="table-row">
              <div className="serial"></div>
              <div className="country" colSpan="5">
                No exams available
              </div>
            </div>
          ) : (
            exams.map((exam, index) => (
              <div className="table-row" style={{color:"grey"}} key={exam._id}>
                <div className="serial">{index + 1}</div>
                <div className="country">{exam.examName}</div>
                <div className="visit">{formatDate(exam.dateOfExam)}</div>
                <div className="visit">{formatTime(exam.startTime)}</div>
                <div className="visit">{formatTime(exam.endTime)}</div>
                <div className="percentage">
                  <button
                    style={{ marginRight: "10px" }}
                    className="btn btn-primary"
                    disabled={!isExamActive(exam.dateOfExam, exam.startTime, exam.endTime)}
                    onClick={() => handleStartExam(exam._id)}
                  >
                    Start
                  </button>

                  {/* Display marks from studentAnswers */}
                  {exam.studentAnswers.map((answer, index) => (
                    <div key={index} style={{ color: "black" }}>
                      <p>Marks: {answer.marks}</p>
                      <p>Feedbacks: {answer.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamTable;













// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ExamTable() {
//   const [exams, setExams] = useState([]);
//   const [previousExams, setPreviousExams] = useState([]);
//   const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
//   const [acknowledgmentMessage, setAcknowledgmentMessage] = useState(""); // State for acknowledgment message
//   const navigate = useNavigate();

//   useEffect(() => {
//     const param = {
//       id: auth.classId,
//     };

//     fetch(`http://localhost:4000/student/examDetails`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(param),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Check if there are new exams
//         if (data.length !== 0 ) {
//           setAcknowledgmentMessage("A new exam has been added");
//         }
        
//         setPreviousExams(exams); // Store the previous exams before updating
//         setExams(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching exams:", error);
//       });
//   }, [auth]);

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString) => {
//     const [hours, minutes] = timeString.split(":");
//     const date = new Date();
//     date.setHours(hours);
//     date.setMinutes(minutes);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false, // 24-hour format
//     });
//   };

//   const isExamActive = (dateOfExam, startTime, endTime) => {
//     const examDate = new Date(dateOfExam);
//     const currentDate = new Date();

//     const [startHours, startMinutes] = startTime.split(":");
//     const [endHours, endMinutes] = endTime.split(":");

//     const examStartTime = new Date(examDate);
//     examStartTime.setHours(startHours, startMinutes, 0, 0);

//     const examEndTime = new Date(examDate);
//     examEndTime.setHours(endHours, endMinutes, 0, 0);

//     return currentDate >= examStartTime && currentDate <= examEndTime;
//   };

//   const handleStartExam = (examId) => {
//     navigate(`/exam/${examId}`);
//   };

//   return (
//     <div className="section-top-border">
//       <h3 className="mb-30 title_color">EXAMS</h3>
//       {acknowledgmentMessage && (
//         <div style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "10px" }}>
//           {acknowledgmentMessage}
//         </div>
//       )}
//       <div className="progress-table-wrap">
//         <div className="progress-table">
//           <div className="table-head">
//             <div className="serial">#</div>
//             <div className="country">Exam Name</div>
//             <div className="visit">Exam Date</div>
//             <div className="visit">Start Time</div>
//             <div className="visit">End Time</div>
//             <div className="percentage">Actions</div>
//           </div>
//           {exams.length === 0 ? (
//             <div className="table-row">
//               <div className="serial"></div>
//               <div className="country" colSpan="5">
//                 No exams available
//               </div>
//             </div>
//           ) : (
//             exams.map((exam, index) => (
//               <div className="table-row" key={exam._id}>
//                 <div className="serial">{index + 1}</div>
//                 <div className="country">{exam.examName}</div>
//                 <div className="visit">{formatDate(exam.dateOfExam)}</div>
//                 <div className="visit">{formatTime(exam.startTime)}</div>
//                 <div className="visit">{formatTime(exam.endTime)}</div>
//                 <div className="percentage">
//                   <button
//                     style={{ marginRight: "10px" }}
//                     className="btn btn-primary"
//                     disabled={!isExamActive(exam.dateOfExam, exam.startTime, exam.endTime)}
//                     onClick={() => handleStartExam(exam._id)}
//                   >
//                     Start
//                   </button>

//                   {/* Display marks from studentAnswers */}
//                   {exam.studentAnswers.map((answer, index) => (
//                     <div key={index} style={{ color: "black" }}>
//                       <p>Marks: {answer.marks}</p>
//                       <p>Feedbacks: {answer.feedback}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExamTable;
