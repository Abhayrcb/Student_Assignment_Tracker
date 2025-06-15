// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreateAssignment from './pages/CreateAssignment';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import SubmissionPage from './pages/SubmissionPage';
import SubmissionDetails from './pages/SubmissionDetails';




function App() {
  

  return (
    <>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/submission" element={<SubmissionPage/>}/>
            <Route path="/submission-details/:assignmentId" element={<SubmissionDetails/>}/>
        </Routes>
    </>
  )
}

export default App
