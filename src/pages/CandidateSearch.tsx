import { useState, useEffect } from 'react';
import { searchGithub ,searchGithubUser} from '../api/API'; // Assuming searchGithub is the main function

interface Candidate {
  id: number;
  avatar_url: string;
  location: string;
  email: string;
  company: string;
  bio: string;
  name: string;
  login: string;
  html_url: string;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
   img:{
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit : 'cover'
   }
};


const CandidateSearch = () => {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial candidates and check saved candidates in localStorage
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await searchGithub(); // Assuming searchGithub fetches data
        setResults(data);
        
      } catch (err: any) {
        const message = err.message || 'An error occurred';
        setError(message);
      }
    };

    // Load saved candidates from localStorage if available
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }

    fetchInitialData();
  }, []);

  // Handle saving a candidate and moving to the next one
  const saveCandidate = () => {
    if (currentIndex >= results.length) 
    return;

    const currentCandidate = results[currentIndex];
    const updatedSavedCandidates = [...savedCandidates, currentCandidate];
    
    // Save to localStorage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    setSavedCandidates(updatedSavedCandidates);

    // Move to the next candidate, if available
    setCurrentIndex((prevIndex) => (prevIndex + 1 < results.length ? prevIndex + 1 : prevIndex));
  };

  // Handle skipping a candidate
  const skipCandidate = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

   const handleSearch = async () => {
    try {
      const data = await searchGithubUser(search);
      setResults(data);
    } catch (err: any) {
      const message = err.message || 'An error occurred';
      setError(message);
    }
  }
   //how to use handle search function
    



  return (
    <div className="container">
      <h1>Candidate Search</h1>
      {error && <div>{error}</div>}

      {results.length > 0 && currentIndex < results.length ? (
        <div key={results[currentIndex].id}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
          <h2>Candidate {currentIndex + 1}</h2>
          <img src={results[currentIndex].avatar_url} alt="avatar" />
          <div>Name: {results[currentIndex].name || 'N/A'}</div>
          <div>Username: {results[currentIndex].login}</div>
          <div>Location: {results[currentIndex].location || 'Not provided'}</div>
          <div>Email: {results[currentIndex].email || 'Not provided'}</div>
          <div>Company: {results[currentIndex].company || 'Not provided'}</div>
          <a href={results[currentIndex].html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
         
          <div>
            <button onClick={saveCandidate}> +</button>
            <button onClick={skipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <div>No more candidates available for review.</div>
      )}
    </div>
  );
};

export default CandidateSearch;
