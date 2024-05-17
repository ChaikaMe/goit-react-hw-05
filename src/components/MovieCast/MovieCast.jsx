import { useState, useEffect } from "react";
import { getCast } from "../../movies-api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getCast(movieId);
        setCastData(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCast();
  }, []);
  return (
    <div>
      {isLoading && <b>Loading...</b>}
      {error && <b>Error! Please reload the page!</b>}
      <ul>
        {castData.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <b>{actor.name}</b>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
