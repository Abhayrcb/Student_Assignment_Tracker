import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase'; // Adjust the path as per your project structure 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/LoginPage.css';

function LoginPage() {
const navigate = useNavigate();


const loginhandler = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
     await signInWithEmailAndPassword(auth, email, password);
    // Redirect to the dashboard or home page after successful login
    navigate('/'); // Adjust the path as per your routing setup

  } catch (error) {
    alert("Login failed. Please check your email and password.");
    console.error("Login failed:", error);
    e.target.email.value= ''; // Clear the email field
    e.target.password.value = ''; // Clear the password field
     // Optionally, you can redirect to a login page or show an error message
     // For example:
     //
    navigate('/login');
     // Redirect back to login page on failure
  }
}



  return (
    <>
       <div class="login-container">
    <h2><b>Login</b></h2>
    <form id="loginForm" onSubmit={loginhandler}>
      <input type="email" id="email" placeholder="Email Address" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p id="message"></p>
    </form>
    <p className="signup-text">
      Don’t have an account? <Link to="/signup">Sign up</Link>
    </p>
  </div>
    </>
  )
}

export default LoginPage
