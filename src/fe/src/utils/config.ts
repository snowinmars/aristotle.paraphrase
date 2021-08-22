declare global {
    interface Window { _env_: ReactApp; }
}

interface Config {
    protocol: string,
    host: string,
    port: number,
    gitHash: string,
    beUri: string,
}

type ReactApp = {
    REACT_APP_PROTOCOL: string;
    REACT_APP_HOST: string;
    REACT_APP_PORT: number;
    REACT_GIT_HASH: string;
}

const protocol = process?.env?.REACT_APP_PROTOCOL || window._env_?.REACT_APP_PROTOCOL || 'http';
const host = process?.env?.REACT_APP_HOST || window._env_?.REACT_APP_HOST || '127.0.0.1';
const port = (process?.env?.REACT_APP_PORT && parseInt(process.env.REACT_APP_PORT)) || window._env_?.REACT_APP_PORT || 5000;
const gitHash = process?.env?.REACT_GIT_HASH || window._env_?.REACT_GIT_HASH || 'Загружаю...';

export const config: Config = {
    protocol,
    host,
    port,
    gitHash,
    beUri: `${protocol}://${host}:${port}`,
};
