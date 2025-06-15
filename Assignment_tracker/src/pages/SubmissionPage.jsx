import React, { useState } from 'react';
import { db, storage, auth } from '../services/firebase';
import { doc, setDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Navigate, useParams } from 'react-router-dom';
// import '../stylesheets/SubmissionPage.css'



function SubmitAssignment() {
  const { assignmentId } = useParams(); // from URL
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("pdf");

  // New fields
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [roll, setRoll] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!file || !name || !className || !roll) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage,` submissions/${assignmentId}/${user.uid}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Create submission data
      const submissionData = {
        studentId: user.uid,
        assignmentId,
        fileURL: downloadURL,
        format,
        submittedAt: Timestamp.now(),
        studentName: name,
        studentClass: className,
        rollNumber: roll
      };

      // Save in Firestore
      const submissionRef = doc(collection(db, "assignments", assignmentId, "submissions"), user.uid);
      await setDoc(submissionRef, submissionData);

      alert("Assignment submitted successfully!");
      Navigate("/student-dashboard");
    } catch (err) {
      console.error(err);
      alert("Error uploading assignment: " + err.message);
    }
  };

  return (
    <div>
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Class (e.g. BCA)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
        </select>

        <input
          type="file"
          accept={format === 'pdf' ? 'application/pdf' : 'image/*'}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input type="submit" value="Submit Assignment" />
      </form>
    </div>
  );
}

export default SubmitAssignment;