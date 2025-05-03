import React, { useEffect, useState } from 'react';
import { getAllCountries, searchCountries } from '../services/countryService';
import { SearchBar } from '../components/SearchBar';
import { CountryCard } from '../components/CountryCard';
import { GlobeIcon } from 'lucide-react';
type Country = {
  name: string;
  alpha3Code: string;
  flag: string;
  capital?: string;
  population: number;
  region: string;
};
export const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCountries(countries);
      return;
    }
    try {
      setLoading(true);
      const results = await searchCountries(query);
      setFilteredCountries(results);
      if (results.length === 0) {
        setError(`No countries found matching "${query}"`);
      } else {
        setError(null);
      }
    } catch (err) {
      setError('Error searching countries. Please try again.');
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  };
  return <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Countries
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search and discover detailed information about countries around the
            world
          </p>
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        {loading ? <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div> : error ? <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            {searchQuery && <button onClick={() => handleSearch('')} className="text-blue-600 hover:text-blue-800 font-medium">
                Clear search and show all countries
              </button>}
          </div> : <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredCountries.length}{' '}
                {filteredCountries.length === 1 ? 'country' : 'countries'} found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries.map(country => <CountryCard key={country.alpha3Code} country={country} />)}
            </div>
            {filteredCountries.length === 0 && !error && <div className="text-center py-10">
                <GlobeIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  No countries found. Try a different search term.
                </p>
              </div>}
          </>}
      </div>
    </div>;
};