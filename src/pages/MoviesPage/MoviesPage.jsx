import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovies } from "../../movies-api";
import { Formik, Form, Field } from "formik";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovies(queryParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [queryParam]);
  return (
    <>
      <Navigation />
      <h1>Movies Page</h1>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          setSearchParams({ query: values.query });
          actions.resetForm();
        }}
      >
        <Form>
          <Field type="text" name="query" autoComplete="off" autoFocus />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <MovieList movies={movies} />
      {isLoading && <b>Loading...</b>}
      {error && <b>Error! Please reload the page!</b>}
    </>
  );
}
