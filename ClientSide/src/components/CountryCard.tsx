import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkIcon, MapPinIcon } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useAuth } from '../contexts/AuthContext';
type CountryCardProps = {
  country: {
    name: string;
    alpha3Code: string;
    flag: string;
    capital?: string;
    population: number;
    region: string;
  };
};
export const CountryCard: React.FC<CountryCardProps> = ({
  country
}) => {
  const {
    isAuthenticated
  } = useAuth();
  const {
    addBookmark,
    removeBookmark,
    isBookmarked
  } = useBookmarks();
  const bookmarked = isBookmarked(country.alpha3Code);
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  return <Link to={`/countries/${country.alpha3Code}`} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img src={country.flag} alt={`Flag of ${country.name}`} className="w-full h-full object-cover" />
        {isAuthenticated && <button onClick={handleBookmarkToggle} className={`absolute top-2 right-2 p-2 rounded-full ${bookmarked ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`} aria-label={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
            <BookmarkIcon size={16} className={bookmarked ? 'fill-current' : ''} />
          </button>}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          {country.name}
        </h3>
        <div className="text-gray-600 text-sm space-y-1 mb-4">
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          {country.capital && <div className="flex items-center">
              <MapPinIcon size={14} className="mr-1" />
              <span>{country.capital}</span>
            </div>}
          <p>
            <strong>Population:</strong> {formatPopulation(country.population)}
          </p>
        </div>
        <div className="mt-auto">
          <div className="text-blue-600 text-sm font-medium">
            View details →
          </div>
        </div>
      </div>
    </Link>;
};