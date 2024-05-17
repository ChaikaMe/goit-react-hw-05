import { useState, useEffect } from "react";
import { getReviews } from "../../movies-api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);
  return (
    <div>
      {isLoading && <b>Loading...</b>}
      {error && <b>Error! Please reload the page!</b>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <b>Author: {review.author}</b>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>No rewiews yet!</b>
      )}
    </div>
  );
}
