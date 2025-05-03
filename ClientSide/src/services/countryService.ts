const API_URL = 'https://restcountries.com/v2';
export async function getAllCountries() {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}
export async function getCountryByCode(code: string) {
  try {
    const response = await fetch(`${API_URL}/alpha/${code}`);
    if (!response.ok) throw new Error('Failed to fetch country');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching country with code ${code}:`, error);
    throw error;
  }
}
export async function searchCountries(name: string) {
  try {
    const response = await fetch(`${API_URL}/name/${name}`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error('Failed to search countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching countries:', error);
    if (error instanceof Error && error.message.includes('404')) {
      return [];
    }
    throw error;
  }
}