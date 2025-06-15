import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Adjust the path as per your project structure 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Adjust the path if needed
import '../stylesheets/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const loginhandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
   

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const userDocRef = doc(db, "users", uid);
      
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {


        const userData = userSnap.data();
        const role = userData.role;

        if (role === "student") {
          navigate("/student-dashboard");
        } 
        
        else if (role === "teacher") {
          navigate("/teacher-dashboard");
        } 
        
        else {
          alert("please tick the right role");
        }
      } else {
        alert("user not found please register");
      }
    } catch (error) {
      alert("Login failed. Please check your email and password.");
      console.error("Login failed:", error);
      e.target.email.value = '';
      e.target.password.value = '';
      navigate('/login',);
    }
  }

  return (
    <>
      <div className="login-container">
        <h2><b>Login</b></h2>
        <form id="loginForm" onSubmit={loginhandler}>
          <input type="email" id="email"  placeholder="Email Address" required />
          <input type="password" id="password"  placeholder="Password" required />
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