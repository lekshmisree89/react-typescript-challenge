// Line 1-13
//import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

// Add necessary code to display the navigation bar
  // and link between the pages
  if (window.location.pathname === '/') {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Search</Link>

          </li>
          
          <li>
            <Link to="/SavedCandidates">Saved Candidates</Link>
          </li>
        </ul>
      </nav>
    )
  
 
  }
};

export default Nav;
