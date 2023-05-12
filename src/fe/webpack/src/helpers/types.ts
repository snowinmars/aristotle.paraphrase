export type WebpackEnv = {
  readonly development?: boolean | undefined;
  readonly production?: boolean | undefined;
  readonly analyze?: boolean | undefined;
  readonly sourceMap?: boolean | undefined;
}

export type ClientEnvironment = {
  readonly raw: NodeJS.ProcessEnv;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly stringified: { 'process.env': NodeJS.ProcessEnv; };
}

export enum BuildEnv {
  development = 'development',
  production = 'production',
}

export type Env = Record<string, string> & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly NODE_ENV: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly REACT_APP_PORT: string;
}

export type WebpackPaths = {
  readonly dotenv: string;
  readonly root: string;
  readonly publicUrlOrPath: string;
  readonly dist: string;
  readonly distIndexRelative: string;
  readonly public: string;
  readonly publicHtml: string;
  readonly publicEnvGen: string;
  readonly publicManifest: string;
  readonly publicRobots: string;
  readonly publicCssThemes: string[];
  readonly publicFtpIcons: string[];
  readonly publicFonts: string[];
  readonly publicFavicon: string;
  readonly srcIndex: string;
  readonly packageJson: string;
  readonly src: string;
  readonly tsConfig: string;
  readonly yarnLockFile: string;
  readonly nodeModules: string;
  readonly distEnvGen: string;
  readonly distPublic: string;
  readonly srcServiceWorker: string;
  readonly distManifest: string;
  readonly webpackExtensions: string;
  readonly moduleFileExtensions: readonly string[];
}

export type WebpackEnvVariables = {
  readonly isDev: boolean;
  readonly isProd: boolean;
  readonly analyze: boolean;
  readonly sourceMap: boolean;
  readonly configuration: 'development' | 'production';
  readonly port: number;
}

export type GetClientEnvironmentProps = {
  readonly dotenvFiles?: string[] | null;
  readonly allowedPrefixes: RegExp[];
  readonly processEnv: NodeJS.ProcessEnv;
}
