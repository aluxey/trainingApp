import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anime = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnime(query);
  };

  const fetchAnime = (searchQuery) => {
    setLoading(true);
    axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${searchQuery}`)
      .then(response => {
        setAnime(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Search Anime</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for an anime" 
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {anime.map((item) => ( 
            <div key={item.id} className='card'>
                <div className='leftSide'>
                  <img src={item.attributes.posterImage.medium} alt={item.attributes.titles.en} className='lilicon' /> 
                </div>
                <div className='rightSide'>
                  <h2>{item.attributes.titles.en}</h2>
                  <p>{item.attributes.startDate} - {item.attributes.endDate}</p> 
                  <p>{item.attributes.description}</p> 
                </div>
            </div> 
        ))}
      </ul>
    </div>
  );
};

export default Anime;
