import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJiZTc0YjBkNTllNWU3N2Y2ZGEwZGExMzQ4MWI4NSIsInN1YiI6IjY2NDY2OGM3OTRhODZiYTRkODM0MjZlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8EcuNbuAi94oIljuNo6hatenszBJYVdlfG652u4wH78",
  },
};

export const getTrendingMovies = async () => {
  const responce = await axios.get("3/trending/movie/day", options);
  return responce.data.results;
};

export const getMovies = async (params) => {
  const responce = await axios.get(`3/search/movie?query=${params}`, options);
  return responce.data.results;
};

export const getMovie = async (movieId) => {
  const responce = await axios.get(`3/movie/${movieId}`, options);
  return responce.data;
};

export const getCast = async (movieId) => {
  const responce = await axios.get(`3/movie/${movieId}/credits`, options);
  return responce.data.cast;
};

export const getReviews = async (movieId) => {
  const responce = await axios.get(`3/movie/${movieId}/reviews`, options);
  return responce.data.results;
};
