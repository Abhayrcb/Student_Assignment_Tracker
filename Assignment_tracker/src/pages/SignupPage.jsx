import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import '../stylesheets/SignupPage.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase'; // Adjust the path as per your project structure
import { addDoc, collection } from 'firebase/firestore';
;

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const role = e.target.role.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Store additional info in Firestore
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        role,
      });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  }



  return (
    <>
    <div className="signup-container">
    <h2>Sign Up</h2>
    <form id="signupForm" onSubmit={handleSubmit}>
      <input type="email" id="email" placeholder="Email Address" required />
      <input type="password" id="password" placeholder="Password" required />
      <input type="text" id="name" placeholder="Your Name" required />
      <select id="role" required>
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
    <p class="login-text">
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </div>
  </>
  )
}

export default SignupPage