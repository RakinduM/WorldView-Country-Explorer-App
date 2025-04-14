import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../services/countries';
import { AuthContext } from '../../context/AuthContext';
import { CountriesContext } from '../../context/CountriesContext';
import { addFavorite, removeFavorite } from '../../services/users';
import { ArrowLeftIcon, HeartIcon as HeartOutline, HeartIcon as HeartSolid } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();
  const { favorites, fetchFavorites } = useCountries();
  //const isFavorite = favorites.includes(code);

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCountryByCode(code);
        setCountry(data[0]);
      } catch (err) {
        setError(err.message || 'Failed to fetch country details');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [code, navigate]);

//   const handleFavorite = async () => {
//     if (!user) return;
    
//     try {
//       if (isFavorite) {
//         await removeFavorite(code, token);
//       } else {
//         await addFavorite(code, token);
//       }
//       fetchFavorites();
//     } catch (error) {
//       console.error('Failed to update favorites', error);
//     }
//   };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!country) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-800 shadow rounded mb-12 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full max-h-96 object-cover rounded shadow"
          />
        </div>

        <div>
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold">{country.name.common}</h1>
            {user && (
              <button
                onClick={handleFavorite}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? (
                  <HeartSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartOutline className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Official Name:</span> {country.name.official}
              </p>
              <p>
                <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Capital:</span> {country.capital?.join(', ') || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="px-4 py-1 bg-white dark:bg-gray-800 shadow rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;