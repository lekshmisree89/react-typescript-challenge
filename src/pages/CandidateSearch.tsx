import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API'; // Assuming searchGithub is the main function


//import { Candidate } from '../interfaces/Candidate.interface';
interface Candidate {
  id: number;
  avatar_url: string;
  location: string;
  email: string;
  bio: string;
  name: string;
  login: string;
  html_url: string;
  company: string;
}


const CandidateSearch = () => {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true); // Start loading
        const data = await searchGithub();
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false); // End loading
      }
    };

    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }

    fetchInitialData();
  }, []);

  const saveCandidate = () => {
    if (currentIndex >= results.length) return;
    const currentCandidate = results[currentIndex];
    const updatedSavedCandidates = [...savedCandidates, currentCandidate];
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    setSavedCandidates(updatedSavedCandidates);
    setCurrentIndex((prevIndex) => (prevIndex + 1 < results.length ? prevIndex + 1 : prevIndex));
  };

  const skipCandidate = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      const data = await searchGithubUser(search);
      setResults([data]); // Set search result as single user
      setCurrentIndex(0);
    } catch (err: any) {
      setError(err.message || 'User not found or an error occurred');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="container">
      <h1>Candidate Search</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <div>Loading...</div> // Show loading indicator while fetching data
      ) : results.length > 0 && currentIndex < results.length ? (
        <div key={results[currentIndex].id}>
          <h2>Candidate {currentIndex + 1}</h2>
          <img src={results[currentIndex].avatar_url} alt="avatar" 
          style={{width: '100px', height: '100px', borderRadius: '50%' }}
          
          />
          <div>Name: {results[currentIndex].name || 'N/A'}</div>
          <div>Username: {results[currentIndex].login}</div>
          <div>Location: {results[currentIndex].location || 'Not provided'}</div>
          <div>Email: {results[currentIndex]. email || 'Not provided'}</div>
          <div>Company: {results[currentIndex].company || 'Not provided'}</div>
          <a href={results[currentIndex].html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>

          <div>
            <button onClick={saveCandidate} 
           style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
            
            
            > +</button>
            <button onClick={skipCandidate}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
        



            >-</button>
          </div>
        </div>
      ) : (
        <div>No more candidates available for review.</div>
      )}
    </div>
  );
};
export default CandidateSearch;