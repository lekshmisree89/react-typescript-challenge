import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

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

const CandidateSearch = () => {
  const [search, setSearch] = useState<string>('');

  // Fetch candidates based on search query
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial candidates
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await searchGithub();
        setResults(data);
      } catch (err: any) {
        const message = err.message || 'An error occurred';
        setError(message);
      }
    };
    fetchInitialData();
  }, []);

  // Handle saving a candidate and moving to the next one
  const saveCandidate = () => {
    const currentCandidate = results[currentIndex];
    const updatedSavedCandidates = [...savedCandidates, currentCandidate];
    
    // Save to localStorage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    setSavedCandidates(updatedSavedCandidates);
    
    // Move to the next candidate
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Handle skipping a candidate
  const skipCandidate = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container">
      <h1>Candidate Search</h1>
      {error && <div>{error}</div>}
      {results.length > 0 && currentIndex < results.length ? (
        <div key={results[currentIndex].id}>
          <img src={results[currentIndex].avatar_url} alt="avatar" />
          <div>Name: {results[currentIndex].name}</div>
          <div>Username: {results[currentIndex].login}</div>
          <div>Location: {results[currentIndex].location}</div>
          <div>Email: {results[currentIndex].email}</div>
          <div>Company: {results[currentIndex].company}</div>
          <a href={results[currentIndex].html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
          <div>
            <button onClick={saveCandidate}>+</button>
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
