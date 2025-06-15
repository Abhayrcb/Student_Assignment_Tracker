import React from 'react'
import '../stylesheets/Navbar.css'
import { Link } from 'react-router'

function Navbar() {
  return (
    <>
     <header class="header">
    <div class="logo">Assigment Tracker</div>
    <nav class="nav">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/student-dashboard">Student Dashboard</Link>
      <Link to="/teacher-dashboard">Teacher-dashboard</Link>
      <Link to="/signup">Register</Link>
    </nav>
  </header>
    </>
  )
}

export default Navbar