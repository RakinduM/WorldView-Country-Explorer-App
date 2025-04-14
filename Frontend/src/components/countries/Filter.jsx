import { useCountries } from '../../hooks/useCountries';

const Filter = () => {
  const { filterByRegion } = useCountries();
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleFilter = (region) => {
    filterByRegion(region.toLowerCase());
  };

  return (
    <div className="w-full md:w-48">
      <select
        onChange={(e) => handleFilter(e.target.value)}
        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;