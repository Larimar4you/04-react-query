import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={styles.item}
          onClick={() => onSelect(movie)}
        >
          <img
            className={styles.image}
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />

          <p className={styles.title}>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
}
