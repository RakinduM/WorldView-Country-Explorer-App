import { createContext, useState, useCallback } from "react";
import { getAllCountries, getCountriesByRegion } from "../services/countries";

export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch countries"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterByRegion = useCallback(
    async (region) => {
      if (region === "all") {
        fetchCountries();
        return;
      }
      setIsLoading(true);
      try {
        const data = await getCountriesByRegion(region);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message || "Failed to filter countries");
      } finally {
        setIsLoading(false);
      }
    },
    [countries]
  );

  const searchCountries = useCallback(
    (searchTerm) => {
      if (!searchTerm) {
        setFilteredCountries(countries);
        return;
      }
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    },
    [countries]
  );

  return (
    <CountriesContext.Provider
      value={{
        countries,
        filteredCountries,
        isLoading,
        error,
        filterByRegion,
        searchCountries,
        fetchCountries,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
