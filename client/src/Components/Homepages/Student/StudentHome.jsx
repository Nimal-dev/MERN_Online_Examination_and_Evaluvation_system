import React from 'react'

import StudentHeader from './Common/StudentHeader'
import BannerArea from './StudentPageComponents/BannerArea'
import Footer from '../../LandingPage/Common/Footer'
import ExamTable from './StudentPageComponents/ExamTable'
import Results from './StudentPageComponents/Results'
import AssignmentTable from './StudentPageComponents/AssignmentTable'
import PreviousQuestionsTable from './StudentPageComponents/PreviousQuestionsTable'


function StudentHome() {
  return (
    <>
    <StudentHeader/>
    <BannerArea/>
    <ExamTable/>
    <AssignmentTable/>
    <PreviousQuestionsTable/>
    {/* <Results/> */}
    
    <Footer/>
    </>
  )
}

export default StudentHome