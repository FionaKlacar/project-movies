import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../movieList.css'

const MovieList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=c77f0f257b1db8c5cdfe593182e32f79&language=en-US&page=1')
      .then((res) => res.json())
      .then((data) => setList(data.results))
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div className="mainWrapper">
      {list.map((movies) => {
        return (
          <Link key={movies.id} to={`/details/${movies.id}`}>
            <img alt="img" className="listPosterImg" src={`https://image.tmdb.org/t/p/w342${movies.poster_path}`} />
            <div className="eachMovie">
              <h2 className="listMovieTitle">{movies.original_title}</h2>
              <p className="releaseDate">{movies.release_date}</p>
            </div>
          </Link>
        )
      })}
    </div>

  )
}

export default MovieList;