import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
// import '../stylesheets/SubmissionDetails.css'


function SubmissionDetails() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not authenticated.");
          return;
        }

        // Check if this assignment belongs to this teacher
        const assignmentRef = doc(db, "teachers", user.uid, "assignments", assignmentId);
        const assignmentSnap = await getDoc(assignmentRef);

        if (!assignmentSnap.exists()) {
          setError("You do not have access to this assignment's submissions.");
          return;
        }

        // Fetch all submissions under this assignment
        const submissionsRef = collection(db, "assignments", assignmentId, "submissions");
        const submissionSnap = await getDocs(submissionsRef);

        const data = submissionSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Assignment Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Roll Number</th>
              <th>Format</th>
              <th>Submitted At</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.studentName}</td>
                <td>{sub.studentClass}</td>
                <td>{sub.rollNumber}</td>
                <td>{sub.format}</td>
                <td>{sub.submittedAt?.toDate().toLocaleString()}</td>
                <td><a href={sub.fileURL} target="_blank" rel="noreferrer">View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubmissionDetails;