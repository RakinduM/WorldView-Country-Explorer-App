import React, { useEffect, useState, useCallback } from 'react';
import { getAllCountries, searchCountries, getCountriesByRegion } from '../services/countryService';
import { SearchBar } from '../components/SearchBar';
import { CountryCard } from '../components/CountryCard';
import debounce from 'lodash.debounce';

type Country = {
  name: string;
  alpha3Code: string;
  flag: string;
  capital?: string;
  population: number;
  region: string;
};

const ITEMS_PER_PAGE = 16;

export const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

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

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        filterByRegion(selectedRegion, countries);
        setError(null);
        setCurrentPage(1); // Reset to the first page
        return;
      }
      try {
        setLoading(true);
        const results = await searchCountries(query);
        filterByRegion(selectedRegion, results);
        setCurrentPage(1); // Reset to the first page
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
    }, 300),
    [countries, selectedRegion]
  );

  const filterByRegion = async (region: string, countriesToFilter: Country[]) => {
    if (region === 'All') {
      setFilteredCountries(countriesToFilter);
    } else {
      try {
        setLoading(true);
        const filtered = await getCountriesByRegion(region);
        setFilteredCountries(filtered);
      } catch (err) {
        setError(`Failed to fetch countries for region: ${region}`);
        setFilteredCountries([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRegionChange = async (region: string) => {
    setSelectedRegion(region);
    await filterByRegion(region, countries);
    setCurrentPage(1); // Reset to the first page
  };

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">Explore Countries</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Search and discover detailed information about countries around the world
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <SearchBar onSearch={handleSearch} />
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="p-3 border border-gray-700 bg-gray-800 text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                {filteredCountries.length}{' '}
                {filteredCountries.length === 1 ? 'country' : 'countries'} found
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedCountries.map((country) => (
                <CountryCard key={country.alpha3Code} country={country} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};