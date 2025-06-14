import React from 'react'
import { Link } from 'react-router-dom';

import '../stylesheets/LoginPage.css';

function LoginPage() {
  return (
    <>
       <div class="login-container">
    <h2><b>Login</b></h2>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email Address" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p id="message"></p>
    </form>
    <p class="signup-text">
      Don’t have an account? <Link to="/signup">Sign up</Link>
    </p>
  </div>
    </>
  )
}

export default LoginPage
