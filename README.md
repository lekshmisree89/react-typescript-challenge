# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), which uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc), which uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you're developing a production application, we recommend updating the configuration to enable type-aware lint rules:

* Configure the top-level `parserOptions` property as follows:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

* Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.
* Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`.
* Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` and `plugin:react/jsx-runtime` to the `extends` list.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.






# Candidate Search Application
# Description


The Candidate Search application allows mployers to browse GitHub profiles and identify potential candidates for open positions. It fetches data from the GitHub API and enables users to save or skip candidates based on their information, such as name, username, location, avatar, email, and company. The saved candidates list persists across page reloads and can be viewed later.

# Table of Contents
 -- Installation
 Usage
 Technologies Used
 License
 Screenshots
 Deployment
 
 
 ## Installation


Clone the repository to your local machine.

Navigate to the project directory.
Install the dependencies.
npm install

Create a .env file in the root directory and add your GitHub Personal Access Token:
makefile.
Copy code
VITE_GITHUB_TOKEN=your_github_token_here
Start the development server.
npm run dev

## Usage
On the Candidate Search page, you will see the details of a candidate pulled from GitHub.
Click the "+" button to save the candidate and view the next one.
Click the "-" button to skip the current candidate and view the next one without saving.
Navigate to the Potential Candidates page to view saved candidates.
The saved candidates list persists across page reloads.


## Technologies Used
TypeScript
React
Node.js
Express
GitHub REST API
LocalStorage (for front-end state persistence)
Render (for deployment)



Screenshots
Candidate information with options to accept or skip.
![screenshot:search page](image.png)

List of saved candidates with their details.
![saved candidates](image-1.png)



Deployment
The application is deployed on Render. You can access the live version here.
