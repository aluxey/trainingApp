// src/Profile.js
import React from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

import '../style/user.css';

function User() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
        await auth.signOut();
        } catch (error) {
        console.error('Error during logout:', error);
        } finally {
        navigate('/');
        }
    };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className='card'>
            <div className='leftSide'>
                <img src={currentUser.photoURL} alt="User Avatar" />
            </div>
            <div className='rightSide'>
                <h2>User Profile</h2>
                <p><strong>Name:</strong> {currentUser.displayName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>UID:</strong> {currentUser.uid}</p>
                <button onClick={logout}>Logout</button>
            </div>  
        </div>
        
    </div>
    
  );
}

export default User;