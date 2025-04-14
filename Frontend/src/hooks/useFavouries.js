import { useState, useEffect } from 'react';
import { getFavorites } from '../services/users';
import { useAuth } from './useAuth';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchFavorites = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { favorites } = await getFavorites(token);
      setFavorites(favorites);
    } catch (err) {
      setError(err.message || 'Failed to fetch favorites');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  return { favorites, isLoading, error, fetchFavorites };
};