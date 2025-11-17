import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder = 'Search for a location or route…', onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="location search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
