import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { MovieModal } from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMoviesSearch = async (query: string) => {
    try {
      setIsError(false);
      setMovies([]);
      setIsLoader(true);
      const data = await fetchMovies(query);
      console.log(data);
      if (data.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  };
  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleMoviesSearch} />
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={movie => movie} />
      )}
      {isOpen && <MovieModal movie={movie} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
