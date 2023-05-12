import { existsSync } from 'fs';

import { Compiler, sources } from 'webpack';

const proceededFiles = new Map<string, boolean>();

export type A = (compiler: Compiler, options: CssVarObfuscatePluginOptions) => void;

export const a: A = (compiler, options) => {
  if (!existsSync(options.buildFolder)) throw new Error(`${options.buildFolder} folder doesn't exist`);

  const pluginName = 'CssVarObfuscatePlugin';

  const { webpack } = compiler;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Compilation } = webpack;

  compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
    compilation.hooks.processAssets.tap(
      {
        name  : pluginName,
        stage : Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
      },
      (assets): void => {
        for (const filename in assets) {
          if (Object.prototype.hasOwnProperty.call(assets, filename)) {
            const asset = compilation.getAsset(filename);  // <- standardized version of asset object
            if (!asset) return;
            if (proceededFiles.has(filename)) return;

            let content: string | Buffer = asset.source.source(); // <- standardized way of getting asset source

            if (typeof content === 'object') content = content.toString('utf8');

            const update = options.obfuscate({
              buildFolder : options.buildFolder,
              excludeName : options.excludeName,
              hashLength  : options.hashLength,
              filename,
              content,
            });

            proceededFiles.set(filename, true);

            // standardized way of updating asset source
            // compilation.updateAsset(
            //   filename,
            //   new sources.SourceMapSource(update, asset.name, asset.source.map(), asset.name, asset.source.map(), true)
            // );
          }
        }
      }
    );
  });
};

export type ObfuscateParameters = {
  readonly buildFolder: string;
  readonly filename: string;
  readonly content: string;
  readonly excludeName: boolean;
  readonly hashLength: number;
}

export type CssVarObfuscatePluginOptions = {
  readonly buildFolder: string;
  readonly excludeName: boolean;
  readonly hashLength: number;
  readonly obfuscate: (parameters: ObfuscateParameters) => string;
}

