// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';

function App() {
  

  return (
    <>
        <Routes>
           <Route path="/" element={<LoginPage/>}></Route>
        </Routes>
    </>
  )
}

export default App
