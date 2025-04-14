import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CountriesContext } from '../../context/CountriesContext';
import { addFavorite, removeFavorite } from '../../services/users';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useCountries } from '../../hooks/useCountries';
import { useAuth } from '../../hooks/useAuth';

const CountryCard = ({ country }) => {
  const { token, user } = useAuth();
  const { favorites, fetchFavorites } = useCountries();
  //const isFavorite = favorites.includes(country.cca2);

//   const handleFavorite = async (e) => {
//     e.preventDefault();
//     if (!user) return;
    
//     try {
//       if (isFavorite) {
//         await removeFavorite(country.cca2, token);
//       } else {
//         await addFavorite(country.cca2, token);
//       }
//       fetchFavorites();
//     } catch (error) {
//       console.error('Failed to update favorites', error);
//     }
//   };

  return (
    <Link
      to={`/country/${country.cca2}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        {user && (
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 text-gray-700" />
            )}
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{country.name.common}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;