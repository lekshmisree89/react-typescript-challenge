import { useEffect, useState } from 'react';

interface Candidate {
  id: number;
  avatar_url: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
  name: string;
  login: string;
  html_url: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  // Handle deleting a candidate
  const deleteCandidate = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    
    // Update state and localStorage
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div className="container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate">
            <img src={candidate.avatar_url} alt="avatar" />
            <div><strong>Name:</strong> {candidate.name || 'Not available'}</div>
            <div><strong>Username:</strong> {candidate.login}</div>
            <div><strong>Location:</strong> {candidate.location || 'Not available'}</div>
            <div><strong>Email:</strong> {candidate.email || 'Not available'}</div>
            <div><strong>Company:</strong> {candidate.company || 'Not available'}</div>
            <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
            <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>No saved candidates available.</div>
      )}
    </div>
  );
};

export default SavedCandidates;
