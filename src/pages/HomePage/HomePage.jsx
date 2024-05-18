import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../movies-api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <MovieList movies={movies} />
      {isLoading && <b>Loading...</b>}
      {error && <b>Error! Please reload the page!</b>}
    </>
  );
}
