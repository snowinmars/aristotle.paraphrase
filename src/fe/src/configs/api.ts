declare global {
  interface Window { _env_: any; }
}

interface Config {
  host: string,
  gitHash: string,
}

const config: Config = {
  host: window._env_.REACT_APP_HOST || 'http://localhost:5002',
  gitHash: window._env_.REACT_GIT_HASH || 'Загружаю...',
};

export default config;
