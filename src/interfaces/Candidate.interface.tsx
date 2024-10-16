// TODO: Create an interface for the Candidate objexects returned by the API
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

export  default Candidate ;