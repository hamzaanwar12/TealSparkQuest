import { useEffect, useState } from 'react';

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzTnmDwDi8Gl60qzrJmB6hRJ1rSnifiu87wM3vX-rGjA2PwgA0drepbni0u3mv5KL0I/exec');
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to check its structure
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { questions, loading, error };
};

export default useFetchQuestions;
