interface Config {
  latexDir: string;
}

const config: Config = {
  latexDir: process.env.LATEXDIR || `${__dirname}/../../latex`,
}

export default config;
