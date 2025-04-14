import { useContext } from 'react';
import { CountriesContext } from '../context/CountriesContext';

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
};