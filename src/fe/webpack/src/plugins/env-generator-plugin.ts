import { existsSync, unlinkSync, writeFileSync } from 'fs';

import { resolve } from 'path';

import { validate } from 'schema-utils';
import { Compilation, Compiler, sources } from 'webpack';

export class EnvGeneratorPlugin {
  private readonly options: EnvGeneratorPluginOptions;

  constructor(options: EnvGeneratorPluginOptions) {
    validate({
      type       : 'object',
      properties : {
        filePaths : {
          type : 'array',
        },
        env : {
          type : 'object',
        },
      },
    }, options, {
      name         : 'Env generator plugin',
      baseDataPath : 'options',
    });

    this.options = options;
  }

  apply(compiler: Compiler): void {
    const pluginName = EnvGeneratorPlugin.name;

    compiler.hooks.emit.tap(pluginName, (compilation: Compilation): void => {
      console.log(`\nGenerate env to ${this.options.filePaths.join(', ')}\n`);

      this.options.filePaths.forEach((filePath) => {
        const data = `window._env_ = ${JSON.stringify(this.options.env, null, 2)}\n`;

        compilation.emitAsset(
          filePath,
          new sources.RawSource(data)
        );
      });
    });
  }
}

export type EnvGeneratorPluginOptions = {
  readonly env: NodeJS.ProcessEnv;
  readonly filePaths: string[];
}
