import { validate } from 'schema-utils';
import {existsSync} from 'fs';
import {Compiler, sources} from "webpack";

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

const proceededFiles = new Map<string, boolean>();

class CssVarObfuscatePlugin {
  private options: CssVarObfuscatePluginOptions;

  constructor(options: CssVarObfuscatePluginOptions) {
    validate({
      type: 'object',
      properties: {
        buildFolder: {
          type: 'string',
        },
        excludeName: {
          type: 'boolean',
        },
        obfuscate: {
          // json schema has no Function type
        }
      },
    }, options, {
      name: 'Css var obfuscate plugin',
      baseDataPath: 'options',
    });

    this.options = options;
  }

  apply(compiler: Compiler) {
    if (!existsSync(this.options.buildFolder)) {
      throw new Error(`${this.options.buildFolder} folder doesn't exist`);
    }

    const pluginName = CssVarObfuscatePlugin.name;

    const { webpack } = compiler;

    const { Compilation } = webpack;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        (assets) => {
          for (let filename in assets) {
            const asset = compilation.getAsset(filename);  // <- standardized version of asset object
            if (!asset) return;
            if (proceededFiles.has(filename)) return

            let content: string | Buffer = asset.source.source(); // <- standardized way of getting asset source

            if (typeof (content) === 'object') {
              content = content.toString('utf8');
            }

            const update = this.options.obfuscate({
              buildFolder: this.options.buildFolder,
              excludeName: this.options.excludeName,
              hashLength: this.options.hashLength,
              filename,
              content,
            });

            proceededFiles.set(filename, true);

            // standardized way of updating asset source
            compilation.updateAsset(
              filename,
              new sources.RawSource(update)
            );
          }
        }
      )
    })
  }
}

module.exports = CssVarObfuscatePlugin;
