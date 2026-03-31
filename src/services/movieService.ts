import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3";

interface SearchMoviesResponse {
  results: Movie[];
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<SearchMoviesResponse>(
    `${API_URL}/search/movie`,
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  return response.data.results;
}
