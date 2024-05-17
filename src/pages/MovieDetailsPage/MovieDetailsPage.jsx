import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { useState, useEffect, useRef } from "react";
import { getMovie } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({ genres: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const movieRef = useRef(location.state);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovie(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, []);

  return (
    <div>
      {isLoading && <b>Loading...</b>}
      {error && <b>Error! Please reload the page!</b>}
      <div>
        <NavLink to={movieRef.current === null ? "/movies" : movieRef.current}>
          Go back
        </NavLink>
        <div className={css.container}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div>
            <h2>{movie.original_title}</h2>
            <p>User Score: {movie.vote_average}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
            <br />
          </div>
        </div>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
