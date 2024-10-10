// TODO: Create an interface for the Candidate objexects returned by the API
interface Candidate {
    id: number;
    name: string;
    email: string;
    status: string;
    skills: string[];
}

export  default Candidate;