import { useState } from 'react';
import { useCountries } from '../../hooks/useCountries';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchCountries } = useCountries();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchCountries(value);
  };

  return (
    <div className="relative w-full md:w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="block w-full pl-10 pr-3 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
  );
};

export default Search;