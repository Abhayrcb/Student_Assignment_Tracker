import React from 'react'
import { doc, setDoc, collection } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useNavigate } from 'react-router';
import { Timestamp } from "firebase/firestore";

function CreateAssignment() {
  const navigate = useNavigate();
  const Assignment = async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }
    const teacherid = user.uid;

    // Fixed typos and matched form field names
    const assignmentData = {
      name: e.target.name.value,
      title: e.target.title.value, // fixed typo
      subject: e.target.subject.value,
      description: e.target.description.value, // fixed typo
      duedate: Timestamp.fromDate(new Date(e.target.date.value)),
      class: e.target.class.value.trim().toLowerCase(),
      issueDate:Timestamp.now(),
      
    }

    try {
      // Create a new document with auto-generated ID
      const assignmentRef = doc(collection(db, "teachers", teacherid, "assignments"));
      await setDoc(assignmentRef, assignmentData);
      await setDoc(doc(collection(db,"assignments")),assignmentData);
      alert("Created successfully");
      navigate("/teacher-dashboard");
    }
    catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div>
      <div className="heading"><h2>Create Assignment</h2></div>
      <form onSubmit={Assignment}>
        <input type="text" name='name' placeholder='Enter your Name' />
        <input type="text" name='title' placeholder='Assignment Title/Topic' />
        <input type="text" name='subject' placeholder='Enter the subject name' />
        <input type="text" name='description' placeholder='Enter the Description' />
        <input type="date" name="date" placeholder="Enter The Due Date" />
        <input type="text" name='class' placeholder='Enter the class' />
        <select name="submission">
          <option value="pdf">PDF format</option>
          <option value="image">Image format</option>
        </select>
        <span>
          <input type="checkbox" />Check Details Before Creating The Assignment
        </span>
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}

export default CreateAssignment