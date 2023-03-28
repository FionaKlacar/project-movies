import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { json } from 'react-router-dom';

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
    <div>
      {list.map((movies) => {
        return (
          <Link key={movies.id} to={`/details/${movies.original_title}`}>
            <p>{movies.original_title}</p>
          </Link>
        )
      })}
    </div>

  )
}

export default MovieList;