import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Landingpage from './Components/LandingPage/Landingpage';
import Authpage from './Components/Authentication/Authpage';
// import AccessDenied from './Components/Common/AccessDenied';
import AdminHomepage from './Components/Homepages/Admin/AdminHomepage';
import TeacherHomePage from './Components/Homepages/Teacher/TeacherHomePage';
import Teachers from './Components/Homepages/Admin/AdminPageComponents/Teachers';
import EditTeacher from './Components/Homepages/Admin/AdminPageComponents/Forms/EditTeacher';
import AddClass from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddClass';
import AddStudent from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddStudent';
import AddExam from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddExam';
import ExamList from './Components/Homepages/Teacher/TeacherpageComponents/ExamList';
import ViewStudentAnswers from './Components/Homepages/Teacher/TeacherpageComponents/ViewStudentAnswers';
import StudentHome from './Components/Homepages/Student/StudentHome';
import StudentsList from './Components/Homepages/Admin/AdminPageComponents/StudentsList';
import FullStudents from './Components/Homepages/Admin/AdminPageComponents/FullStudents';
import ExamPage from './Components/Homepages/Student/StudentPageComponents/ExamPage';
import TeacherAssessmentPage from './Components/Homepages/Teacher/TeacherpageComponents/Forms/TeacherAssessmentPage';
import EvaluateStudent from './Components/Homepages/Teacher/TeacherpageComponents/EvaluateStudent';
import ViewAnswers from './Components/Homepages/Teacher/TeacherpageComponents/ViewAnswers';
import AddAssignment from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddAssignment';
import ViewAssignments from './Components/Homepages/Teacher/TeacherpageComponents/ViewAssignments';
import ViewStudentAssignment from './Components/Homepages/Teacher/TeacherpageComponents/ViewStudentAssignment';
import PreviousQuestionPaperTable from './Components/Homepages/Teacher/TeacherpageComponents/PreviousQuestionPaperTable';
import AddpreviousQuestionPaper from './Components/Homepages/Teacher/TeacherpageComponents/Forms/AddpreviousQuestionPaper';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>

        {/* ---------Auth Routes-------------- */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/AuthPage" element={<Authpage />} />



        {/* -----------------Admin Page Routes-------------------- */}
          <Route path="/AdminHome" element={<AdminHomepage />} />
          <Route path="/Teachers" element={<Teachers />} />
          <Route path="/Students" element={<FullStudents />} />
          <Route path="/StudentHome" element={<StudentHome />} />



       <Route path="/AddClass" element={<AddClass />} />
       <Route path="/AddAssignment" element={<AddAssignment />} />
       <Route path="/AddStudent" element={<AddStudent />} />
       <Route path="/ExamList" element={<ExamList />} />
          <Route path="/AddExam" element={<AddExam />} />
          <Route path="/ViewStudentAnswers" element={<ViewStudentAnswers />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/teacher/assessment/:examId" element={<TeacherAssessmentPage />} />

          <Route path="/ViewAnswers" element={<ViewAnswers/>} />
          {/* <Route path="/ViewStudentAnswers/:examId" element={<ViewStudentAnswers />} />
          <Route path="/EvaluateStudent/:examId/:studentId" element={<EvaluateStudent/>} /> */}


        {/* <Route path="/ViewStudentAnswers" element={<ViewStudentAnswers />} /> */}
        <Route path="/EvaluateStudent" element={<EvaluateStudent />} />
        <Route path="/ViewStudentsAssignments" element={<ViewAssignments />} />
        <Route path="/ViewAssignmentAnswers" element={<ViewStudentAssignment />} />
        <Route path="/PreviousQuestionPaper" element={<PreviousQuestionPaperTable />} />
          <Route path="/AddPreviousQuestionpaper" element={<AddpreviousQuestionPaper />} />


       <Route path="/TeacherHome" element={<TeacherHomePage />} />
       <Route path="/EditTeacher" element={<EditTeacher/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
