import axios from 'axios';
import React, { useState,useEffect } from 'react';
import 'regenerator-runtime/runtime';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query.trim()) {
      fetchMovies();  // Fetch movies whenever the query changes
    }
  }, [query]);

  const fetchMovies = async () => {
    if (query.trim() === '') {
      setError('Invalid movie name. Please try again.');
      setMovies([]);
      return;
    }

    const apiKey = '99eb9fd1';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;  ///http://www.omdbapi.com/?i=tt3896198&apikey=442aaba7

    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search); // Use response.data.Search directly
        setError('');
      } else {
        setError('Invalid movie name. Please try again.');
        setMovies([]);
      }
    } catch (error) {
      setError('An error occurred while fetching data. Please try again.');
      setMovies([]);
    }
  }

  return (
    <div className="movie-search">
      <h1>Search Movies</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchMovies(); }}>
      <input
        type="text"
        placeholder="Search for a movie..."
        onChange={(e) => setQuery(e.target.value)}
        className='error'
      />
      <button onClick={fetchMovies}>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="movie-list">
      {movies.map((movie) => (
        <li  key={movie.imdbID}>
          <h2>{movie.Title}({movie.Year})</h2>
          {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} />}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
