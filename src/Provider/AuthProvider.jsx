import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const updateUser = (user, name, photo, address, phone, gender) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
      phoneNumber:phone,
      address,
      gender,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log(error, "updated");
      });
  };
  const emailAndPass = (email, password, userName, userPhoto) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscrib = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unSubscrib();
  }, []);
  const authInfo = {
    emailAndPass,
    logOut,
    loading,
    currentUser,
    googleLogIn,
    signInWithEmailPass,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
