import React from 'react'
import Sidebar from '../../Common/Sidebar'
import Navbar from '../../Common/Navbar'
import Widgets from '../../Common/Widgets'
import StudentsList from './TeacherpageComponents/StudentsList'
import ClassList from './TeacherpageComponents/ClassList'
import ExamList from './TeacherpageComponents/ExamList'
import AssignmentsList from './TeacherpageComponents/AssignmentsList'

function TeacherHomePage() {
 

  return (
    <>
    <Sidebar/>
    <div class="content">
      <Navbar />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          {/* <Widgets/> */}
          <ClassList/>
          <StudentsList/>
          <ExamList/>
          <AssignmentsList/>
        </div>
      </div>
    </div>
  </>
  )
}

export default TeacherHomePage