import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country) => (
        <CountryCard key={country.cca2} country={country} />
      ))}
    </div>
  );
};

export default CountryList;