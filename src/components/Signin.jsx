// src/SignIn.js
import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase/firebase';
import { useAuth } from '../firebase/AuthContext';


const SignIn = () => {
  const { currentUser } = useAuth();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {currentUser ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default SignIn;
