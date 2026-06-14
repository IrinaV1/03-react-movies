import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';

export default function App() {
  const handleClick = (value: string) => {};
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleClick} />
    </div>
  );
}
