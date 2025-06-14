import React from 'react'
import '../stylesheets/LandinPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
     <div className="dashboard-container">
        <header>
            <h1>Student Assignment Tracker</h1>
            <nav>
                <Link to="#">Landing Page</Link>
                <Link to="#">Profile Page</Link>
                <Link to="#">Dashboard</Link>
                <Link to="/signup">Register</Link>
                <Link to="/signin">Register</Link>
            </nav>
        </header>

        <main>
            <main>
                <h2>Welcome, Student 👋</h2>
                <p class="description">Keep track of your assignments, monitor your progress, and stay productive!</p>

                <section class="cards">
                    <div class="card">
                        <h3>New Assignment</h3>
                        <p>Create and manage your tasks efficiently.</p>
                    </div>
                    <div class="card">
                        <h3>View Progress</h3>
                        <p>Analyze your weekly or monthly progress.</p>
                    </div>
                    <div class="card">
                        <h3>Update Profile</h3>
                        <p>Manage your student details and preferences.</p>
                    </div>
                </section>
                <div class="summary">
                    <h2>About This App</h2>
                    <p>
                        <strong>Student Assignment Tracker</strong> is a web-based tool designed to help students manage
                        their academic workload efficiently.
                        It allows users to create, organize, and track assignments, monitor deadlines, view progress,
                        and stay focused on their academic goals through a clean and user-friendly interface.
                    </p>
                </div>
            </main>
            <footer>
                <p>&copy; 2025 Student Assignment Tracker. All rights reserved.</p>
            </footer>

        </main>
    </div>
    </>
  )
}

export default LandingPage