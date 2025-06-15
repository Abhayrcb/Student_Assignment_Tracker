
import React, { useEffect, useState } from 'react'
import { doc, updateDoc, getDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../services/firebase';
import Navbar from '../components/Navbar';
import '../stylesheets/StudentDashboard.css';

function StudentDashboard() {

  const [Edit, setEdit] = useState(true);
  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Role, setRole] = useState(null);
  const [Class, setClass] = useState("");
  const [uid, setUid] = useState(null);
  
  const [assignments, setAssignments] = useState([]); // ✅ New state for assignments

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setEmail(userData.email);
          setName(userData.name);
          setRole(userData.role);
          setClass(userData.class);

          // ✅ Fetch assignments after class is available
          fetchAssignments(userData.class);
        } else {
          console.log("No user data found!");
        }
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Function to fetch assignments
  const fetchAssignments = async (studentClass) => {
    try {
      const now = Timestamp.now();
      const normalizeClass = studentClass.trim().toLowerClass();
      const q = query(
        collection(db, "assignments"),
        where("class", "==",normalizeClass),
        where("dueDate", ">", now)
      );
      const querySnapshot = await getDocs(q);
      const assignmentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAssignments(assignmentList);
    } catch (error) {
      console.error("Error fetching assignments: ", error);
    }
  };

  const updateValues = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", uid)
    try {
      await updateDoc(userRef, {
        name: e.target.name.value,
        class: e.target.class.value,
        role: e.target.role.value,
      })
      alert("Successfully updated");
      setEdit(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <div className="main-container">
        <Navbar />
        <div className='Profile-container'>
          <div className="left">
            <div className="image">
              <img src="#" alt="logo" />
            </div>
            <button onClick={() => {
              setEdit(false);
            }}>Edit Profile</button>

            <div id="edit-page" hidden={Edit}>
              <form action="" onSubmit={updateValues}>
                <input type="text" name='name' required placeholder='Enter the name..' />
                <input type="email" name="email" placeholder='Enter The Email..' />
                <select name="role" id="role">
                  <option value="role">Role</option>
                  <option value="student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
                <input type="text" name="class" required placeholder='Enter the class' />
                <input type="submit" value="Update" />
              </form>
            </div>
          </div>

          <div className="right">
            <p>Name: {Name}</p>
            <p>Email: {Email}</p>
            <p>Role: {Role}</p>
            <p>Class: {Class}</p>
          </div>
        </div>

        {/* ✅ Assignments Section */}
        <div className="assignment-list">
          <h2>Assignments</h2>
          {assignments.length === 0 ? (
            <p>No active assignments.</p>
          ) : (
            <ul>
              {assignments.map((assignment) => (
                <li key={assignment.id} className="assignment-item">
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  <p><strong>Subject:</strong> {assignment.subject}</p>
                  <p><strong>Due:</strong> {new Date(assignment.dueDate.seconds * 1000).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </>
  )
}

export default StudentDashboard;