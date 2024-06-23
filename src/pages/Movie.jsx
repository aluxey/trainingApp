import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthContext';
import '../style/widget.css';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [watchLater, setWatchLater] = useState([]);
  const { currentUser } = useAuth();
  const apiKey = process.env.REACT_APP_OMDB_API_KEY;
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    console.log(apiKey,'TESTTTT')

    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
        setError(null);
      } else {
        setError(data.Error);
        setMovie(null);
      }
    } catch (error) {
      setError('Error fetching data');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchLater = async () => {
    if (movie && currentUser && !watchLater.some(item => item.imdbID === movie.imdbID)) {
      try {
        await addDoc(collection(db, 'watchLater'), {
          title: movie.Title,
          year: movie.Year,
          director: movie.Director,
          plot: movie.Plot,
          poster: movie.Poster,
          imdbID: movie.imdbID,
          userId: currentUser.uid
        });
        setWatchLater([...watchLater, { ...movie, userId: currentUser.uid }]);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const unfollow = async (imdbID) => {
    try {
      const q = query(collection(db, 'watchLater'), where('userId', '==', currentUser.uid), where('imdbID', '==', imdbID));
      const querySnapshot = await getDocs(q);
      const movieDoc = querySnapshot.docs[0];
      if (movieDoc) {
        await deleteDoc(doc(db, 'watchLater', movieDoc.id));
        setWatchLater(watchLater.filter(item => item.imdbID !== imdbID));
      }
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  const fetchWatchLater = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        const q = query(collection(db, 'watchLater'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const movies = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWatchLater(movies);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWatchLater();
  }, [currentUser, fetchWatchLater]);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {movie && (
        <div>
          <div className='card'>
            <div className='leftSide'>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className='rightSide'>
              <h1>{movie.Title}</h1>
              <p>{movie.Year}</p>
              <p>{movie.Director}</p>
              <p>{movie.Plot}</p>
              <button onClick={handleWatchLater}>Watch later</button>
            </div>
          </div>
        </div>
      )}

      {watchLater.length > 0 && (
        <div>
          <h2>Watch Later List</h2>
          <div className="watch-later">
            {watchLater.map((movie) => (
              <div key={movie.imdbID} className='card'>
                <div className='leftSide'>
                  <img src={movie.poster} alt={movie.title} className='lilicon' />
                </div>
                <div className='rightSide'>
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <p>{movie.director}</p>
                  <p>{movie.plot}</p>
                  <button onClick={() => unfollow(movie.imdbID)} className='unfollow'>Unfollow</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
