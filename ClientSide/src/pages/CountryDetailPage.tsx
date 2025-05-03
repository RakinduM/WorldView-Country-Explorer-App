import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/countryService';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useAuth } from '../contexts/AuthContext';
import { BookmarkIcon, ArrowLeftIcon, GlobeIcon, UsersIcon, CircleDollarSignIcon, MapPinIcon } from 'lucide-react';
import { motion } from 'framer-motion';
type Country = {
  name: string;
  alpha3Code: string;
  flag: string;
  capital?: string;
  population: number;
  region: string;
  subregion?: string;
  languages: {
    name: string;
    nativeName: string;
  }[];
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  borders?: string[];
  area?: number;
  timezones: string[];
};
export const CountryDetailPage = () => {
  const {
    countryCode
  } = useParams<{
    countryCode: string;
  }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    isAuthenticated
  } = useAuth();
  const {
    addBookmark,
    removeBookmark,
    isBookmarked
  } = useBookmarks();
  useEffect(() => {
    const fetchCountry = async () => {
      if (!countryCode) return;
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        setCountry(data);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [countryCode]);
  const bookmarked = country ? isBookmarked(country.alpha3Code) : false;
  const handleBookmarkToggle = () => {
    if (!country) return;
    if (bookmarked) {
      removeBookmark(country.alpha3Code);
    } else {
      addBookmark({
        alpha3Code: country.alpha3Code,
        name: country.name,
        flag: country.flag
      });
    }
  };
  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat().format(population);
  };
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>;
  }
  if (error || !country) {
    return <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Country not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the country you're looking for. It may not exist or
            there might be an error.
          </p>
          <Link to="/countries" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Countries
          </Link>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/countries" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Countries
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <motion.div className="md:w-1/2 h-64 md:h-auto" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5
          }}>
              <img src={country.flag} alt={`Flag of ${country.name}`} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="p-6 md:p-8 md:w-1/2" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {country.name}
                </h1>
                {isAuthenticated && <button onClick={handleBookmarkToggle} className={`p-2 rounded-full ${bookmarked ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`} aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
                    <BookmarkIcon size={20} className={bookmarked ? 'fill-current' : ''} />
                  </button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="flex items-center mb-3 text-gray-700">
                    <GlobeIcon size={18} className="mr-2 text-blue-600" />
                    <span className="font-semibold">Region:</span>
                    <span className="ml-2">{country.region}</span>
                  </div>
                  {country.subregion && <div className="flex items-center mb-3 text-gray-700">
                      <GlobeIcon size={18} className="mr-2 text-blue-600" />
                      <span className="font-semibold">Subregion:</span>
                      <span className="ml-2">{country.subregion}</span>
                    </div>}
                  {country.capital && <div className="flex items-center mb-3 text-gray-700">
                      <MapPinIcon size={18} className="mr-2 text-blue-600" />
                      <span className="font-semibold">Capital:</span>
                      <span className="ml-2">{country.capital}</span>
                    </div>}
                  <div className="flex items-center text-gray-700">
                    <UsersIcon size={18} className="mr-2 text-blue-600" />
                    <span className="font-semibold">Population:</span>
                    <span className="ml-2">
                      {formatPopulation(country.population)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-gray-700">
                    <div className="flex items-center mb-1">
                      <div size={18} className="mr-2 text-blue-600" />
                      <span className="font-semibold">Languages:</span>
                    </div>
                    <ul className="ml-7 list-disc">
                      {country.languages.map(lang => <li key={lang.name}>
                          {lang.name} ({lang.nativeName})
                        </li>)}
                    </ul>
                  </div>
                  {country.currencies && country.currencies.length > 0 && <div className="text-gray-700">
                      <div className="flex items-center mb-1">
                        <CircleDollarSignIcon size={18} className="mr-2 text-blue-600" />
                        <span className="font-semibold">Currencies:</span>
                      </div>
                      <ul className="ml-7 list-disc">
                        {country.currencies.map(currency => <li key={currency.code}>
                            {currency.name} ({currency.symbol})
                          </li>)}
                      </ul>
                    </div>}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Additional Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timezones */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Timezones
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {country.timezones.map((timezone, index) => <div key={index} className="bg-gray-50 px-3 py-2 rounded text-gray-700 text-sm">
                  {timezone}
                </div>)}
            </div>
          </motion.div>
          {/* Border Countries */}
          <motion.div className="bg-white p-6 rounded-xl shadow-md" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Border Countries
            </h2>
            {country.borders && country.borders.length > 0 ? <div className="flex flex-wrap gap-2">
                {country.borders.map(border => <Link key={border} to={`/countries/${border}`} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors">
                    {border}
                  </Link>)}
              </div> : <p className="text-gray-500">
                No bordering countries (island or territory)
              </p>}
          </motion.div>
        </div>
      </div>
    </div>;
};