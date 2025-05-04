import React, { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for a country...'
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger search on input change
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Clear the search results
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Optional: keeps button functional too
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl w-full mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-3 px-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <XIcon size={18} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};
