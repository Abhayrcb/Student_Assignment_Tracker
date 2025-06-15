import React from 'react'
import Navbar from '../components/Navbar'
import '../stylesheets/LandingPage.css'



function LandingPage() {
  return (
  <div className='main-container'>
  <Navbar/>
  <div class="dashboard-container">
    <main>
      <h2>Welcome, Student 👋</h2>
      <p className="description">Manage assignments, track deadlines, and stay productive!</p>

      <section className="cards">
        <div className="card">
          <h3>New Assignment</h3>
          <p>Create and manage your tasks easily.</p>
        </div>
        <div className="card">
          <h3>View Progress</h3>
          <p>Track your academic performance.</p>
        </div>
        <div className="card">
          <h3>Update Profile</h3>
          <p>Edit your personal information.</p>
        </div>
      </section>

      <section class="extended-section">
        <h2>Recent Assignments</h2>
        <ul className="list">
          <li>📄 DBMS Assignment – Due: June 15</li>
          <li>🧮 OS Project Report – Due: June 16</li>
          <li>📚 Software Engg Notes – Due: June 20</li>
        </ul>
      </section>

      <section class="extended-section">
        <h2>Upcoming Deadlines</h2>
        <ul className="list">
          <li>🧪 Testing Quiz – June 18</li>
          <li>📝 BCA Major Project – June 22</li>
        </ul>
      </section>

      <div className="summary">
        <h2>About This App</h2>
        <p><strong>Student Assignment Tracker</strong> helps you keep track of your academic tasks, deadlines, and progress. Stay organized and focused with this simple and efficient tool built for students like you.</p>
      </div>
    </main>

    <footer>
      <p>&copy; 2025 Student Assignment Tracker. All rights reserved.</p>
    </footer>
  </div>
    </div>
  )
}

export default LandingPage