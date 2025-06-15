import React from 'react'
import { Link } from 'react-router'
import { useState,useEffect } from 'react';
import { doc, updateDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db,auth } from '../services/firebase';
import Navbar from '../components/Navbar';
import '../stylesheets/TeacherDashboard.css';

function TeacherDashboard() {

const [assignments,setAssignments] = useState([])
const [Edit,setEdit] = useState(true);
const [Name,setName] =useState(null);
const [Email,setEmail] =useState(null);
const [Role,setRole] =useState(null);
const [Class,setClass] =useState("");
const [uid,setUid] = useState(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUid(user.uid)
      const userDocRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setEmail(userData.email);
        setName(userData.name);
        setRole(userData.role);
        setClass(userData.class); // if you have class in DB
      } else {
        console.log("No user data found!");
      }
    } else {
      console.log("User not logged in");
    }
  });


    return () => unsubscribe(); 
  }, [uid]);

 const updateValues = async (e) =>{
      e.preventDefault();
      console.log(`${uid}`)
      const userRef = doc(db,"users",uid)
      try {
         await updateDoc(userRef,{
            name:e.target.name.value,
            class:e.target.class.value,
            role:e.target.role.value,
         })
         alert("Successfully updated");
         setEdit(true);
      }
      catch(err){
          alert(err);
      }
  }

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const teacherId = user.uid;
      const assignmentsRef = collection(db, "teachers", teacherId, "assignments");
      const querySnapshot = await getDocs(assignmentsRef);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAssignments(data);
    } else {
      console.log("User not logged in");
    }
  });

  return () => unsubscribe();
}, []);

 
  return (
  <>
  <div className="main-container">
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
  <div className='Profile-container'>
        <div className="left">
           <div className="image">
             <img src="#" alt="logo" />
           </div>
           <button onClick={()=>{
              setEdit(false);
           }}>Edit Profile</button>
           <Link to="/create-assignment">Craete Assignment</Link>
           <div id="edit-page" hidden={Edit}>
              <form action="" onSubmit={updateValues}>
                 <input type="text" name='name' required placeholder='Enter the name..'/>
                 <input type="email" name="email" placeholder='Enter The Email..'/>
                <select name="role" id="role">
                   <option value="role">Role</option>
                   <option value="student">Student</option>
                   <option value="Teacher">Teacher</option>
                </select>
                 <input type="text" name="class" placeholder='Enter the class'/>
                 <input type="submit" value="Update"/>
              </form>
           </div>
        </div>

        <div className="right">
           <p>Name:{Name}</p>
           <p>Email:{Email}</p>
           <p>Role:{Role}</p>
           <p>Class:{Class}</p>
        </div>

  </div>

    <div className="assignment-history">
     <h2>📚 Your Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id} className="mb-4 p-3 border rounded">
              <h3 className="font-semibold">{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p><strong>Subject:</strong> {assignment.subject}</p>
              <p><strong>Due:</strong> {assignment.dueDate}</p>
              <Link to={`/submission-details/${assignment.uid}`}>View Sunmission Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
      
    </div>
  </>
  )
}

export default TeacherDashboard