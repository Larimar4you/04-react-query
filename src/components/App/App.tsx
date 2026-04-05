import { type ComponentType } from "react";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { searchMovies } from "../../services/movieService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import { type ReactPaginateProps } from "react-paginate";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

type ModuleWithDefault<T> = { default: T };

// ReactPaginateModule.default

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [movie, setMovie] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", movie, currentPage],
    queryFn: () => searchMovies(movie, currentPage),
    enabled: movie !== "",
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newMovie: string) => {
    setMovie(newMovie);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (movie && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [movie, data]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}

      {movies.length > 0 && <MovieGrid movies={movies} onSelect={() => {}} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </>
  );
}
