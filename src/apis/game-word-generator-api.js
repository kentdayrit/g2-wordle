const API_BASE_URL = 'https://random-word-api.herokuapp.com';

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/word?length=5`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

