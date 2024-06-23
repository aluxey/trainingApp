import React, {useState} from 'react'
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthContext';
import '../style/widget.css';

const Anime = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [anime, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [watchLaterA, setWatchLaterA] = useState([]);
    const { currentUser } = useAuth();
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const [loading, setLoading] = useState(false);

  return (
    <div>
      Anime page
    </div>
  )
}

export default Anime
