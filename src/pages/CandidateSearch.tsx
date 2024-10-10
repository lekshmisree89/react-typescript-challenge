import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  id: number; 
 avatar_url: string;
 location: string;
email: string;
 company: string;
 bio: string;
}

const CandidateSearch = () => {
  const [search, setSearch] = useState<string>();
  const [results, setResults] = useState<Candidate[]>([]);
  const [error, setError] = useState<string|null>();
  // Add necessary code to handle the search form submission
  // and display the search results
  const handleSearch  = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = search? await searchGithubUser(search): await searchGithub();
   if (Array.isArray(data)){
      setResults(data);
   }
    else {
      setResults([data]);

    }
    }catch (err: any) {
      const message = err.message || 'An error occurred';
      setError(message);
    }

  }
  useEffect(() => {
    searchGithub().then((data) => setResults(data));
  }, [])  

  return(
  <div className="container">
    <h1>CandidateSearch</h1>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
    {error && <div>{error}</div>}
    {results.map((candidate) => (
      <div key={candidate.id}>
        <img src={candidate.avatar_url} alt="avatar" />
        <div>{candidate.location}</div>
        <div>{candidate.email}</div>
        <div>{candidate.company}</div>
        <div>{candidate.bio}</div>
      </div>
    ))} 
  </div>
);
};

export default CandidateSearch;
