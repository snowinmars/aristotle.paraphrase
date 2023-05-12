import { existsSync, unlinkSync, writeFileSync } from 'fs';

import path from 'path';

import { validate } from 'schema-utils';
import { Compiler } from 'webpack';

export class PackageJsonGeneratorPlugin {
  private readonly options: PackageJsonGeneratorPluginOptions;

  constructor(options: PackageJsonGeneratorPluginOptions) {
    validate({
      type       : 'object',
      properties : {
        buildFolder : {
          type : 'string',
        },
      },
    }, options, {
      name         : 'Package json generator plugin',
      baseDataPath : 'options',
    });

    this.options = options;
  }

  apply(compiler: Compiler): void {
    if (!existsSync(this.options.buildFolder)) throw new Error(`${this.options.buildFolder} folder doesn't exist`);

    const pluginName = PackageJsonGeneratorPlugin.name;

    compiler.hooks.afterDone.tap(pluginName, (stats) => {
      const gen = path.join(this.options.buildFolder, 'package.json');

      console.log(`\nGenerate package.json to ${gen}\n`);

      const productionPackageJson = {
        ...this.options.currentPackageJson,
      };

      if (existsSync(gen)) unlinkSync(gen);

      writeFileSync(gen, JSON.stringify(productionPackageJson, null, 2));
    });
  }
}

export type PackageJsonGeneratorPluginOptions = {
  readonly buildFolder: string;
  readonly currentPackageJson: Record<string, unknown>;
}
