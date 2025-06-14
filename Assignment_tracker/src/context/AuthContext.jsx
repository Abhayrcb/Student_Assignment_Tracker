import React, {  useEffect, useState,createContext,useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// Create the Auth Context
const AuthContext = createContext();

// Export useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Extra user info: name, role
  const [loading, setLoading] = useState(true);

  // Signup method
  const signup = async (email, password, name, role) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Store extra user info in Firestore
    await setDoc(doc(db, 'users', uid), {
      name,
      role,
      email
    });

    return userCredential.user;
  };

  // Login method
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout method
  const logout = () => {
    return signOut(auth);
  };

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

