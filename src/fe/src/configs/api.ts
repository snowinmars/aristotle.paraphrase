const config = {
  host: process.env.REACT_APP_HOST || 'http://localhost:5002',
  gitHash: process.env.REACT_GIT_HASH || 'Загружаю...',
};

export default config;
