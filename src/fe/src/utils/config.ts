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

if (!window._env_) {
    throw new Error('Window env vars are not defined');
}

const protocol = window._env_.REACT_APP_PROTOCOL || 'http';
const host = window._env_.REACT_APP_HOST || '127.0.0.1';
const port = window._env_.REACT_APP_PORT || 5000;
const gitHash = window._env_.REACT_GIT_HASH || '-';

export const config: Config = {
    protocol,
    host,
    port,
    gitHash,
    beUri: `${protocol}://${host}:${port}`,
};
