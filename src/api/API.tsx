 
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log(import.meta.env);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );
    console.log('Response:', response);
    const data = await response.json();
    console.log('Data:', data);
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    console.log('Data:', data);
    return data;
  } catch (err) {
   console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    //
    const response = await fetch(`https://api.github.com/users/${username}`, {
      //
      headers: {
        Authorization: `Bearer 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
`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
     console.log('an error occurred', err);
    return {};
  }
};

//seargithubuser is a function that takes a username 
//as an argument and returns a promise that resolves to the user data 
//from the github api


export { searchGithub, searchGithubUser };
