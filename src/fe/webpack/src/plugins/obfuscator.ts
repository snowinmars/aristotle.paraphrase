import { ObfuscateParameters } from './css-var-obfuscate-plugin';

const hashes = new Map<string, string>();
const regex = /(--arph-.*?)([):])/g;

export const obfuscate = ({ buildFolder, filename, content, excludeName, hashLength }: ObfuscateParameters): string => content
  .replaceAll(regex, (_, id: string, ending: string): string => {
    let hash = hashes.get(id);

    if (!hash) {
      hash = Math.random().toString(16).slice(2, hashLength + 2);
      hashes.set(id, hash);
    }

    return excludeName ? `--arph-${hash}${ending}` : `${id}-${hash}${ending}`;
  });
