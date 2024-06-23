// src/components/Navbar.js
import React from 'react';
import '../style/navbar.css';
import avatar from '../data/avatar.png';
import { useAuth } from '../firebase/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div className='Navbar'>
      <ul className='listNavbar'>
        <li className='titleNav'><a><Link to="/">TrainingApp</Link></a></li>
        <li><a href="#home"><Link to="/movie">MovieSearch</Link></a></li>
        <li><a href="#home"><Link to="/anime">Anime</Link></a></li> 
        <li className="dropdown"> 
            {currentUser ? (
              <Link to="/test"><img className="dropbtn" src={currentUser.photoURL} alt="User Avatar" /></Link>
            ) : (
              <img className="dropbtn" src={avatar} alt="Default Avatar" />
            )} 
        </li>
      </ul> 
    </div>
  );
}

export default Navbar;
