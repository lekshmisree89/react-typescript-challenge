import { useEffect, useState } from 'react';

import Candidate from '../interfaces/Candidate.interface';

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
      if (window.confirm('Are you sure you want to delete this candidate?')) {
        const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
        setSavedCandidates(updatedCandidates);
        localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      }
  
    // Update state and localStorage
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };
  

  return (
    <div className="container">
      <h1>Potential candidates</h1>
      {savedCandidates.length > 0 ? (     
<table>
<thead>
  <tr>
    <th>Avatar</th>
    <th>Login</th>
    <th>Location</th>
    <th>Email</th>
    <th>Company</th>
    <th>Bio</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {savedCandidates.map((candidate: any) => (
    <tr key={candidate.id}>
      <td><img src={candidate.avatar_url} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
      <td>{candidate.login}</td>
      <td>{candidate.location ? candidate.location : 'Location not available'}</td>
      <td>{candidate.email ? <a href={`mailto:${candidate.email}`}>{candidate.email}</a> : 'Email not available'}</td>
      <td>{candidate.company ? candidate.company : 'Company not available'}</td>
      <td>{candidate.bio ? candidate.bio : 'Bio not available'}</td>
      <td><button onClick={() => deleteCandidate(candidate.id)}>Delete</button></td>
    </tr>
  ))}
</tbody>
</table>
) : (
<p>No candidates were saved</p>
)}
</div>
);
} 
export default SavedCandidates;

