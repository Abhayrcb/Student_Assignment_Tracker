import React from 'react'
import '../stylesheets/Navbar.css'
import { Link } from 'react-router'

function Navbar() {
  return (
    <>
     <header class="header">
    <div class="logo">SAT</div>
    <nav class="nav">
      <Link to="#">Home</Link>
      <Link to="/t-dashboard">Student Dashboard</Link>
      <Link to="/profile-page">Student Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
    </nav>
  </header>
    </>
  )
}

export default Navbar