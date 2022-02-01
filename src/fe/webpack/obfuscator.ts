import {ObfuscateParameters} from "./css-var-obfuscate";

const hashes = new Map<string, string>();
const regex = /(--prf-.*?)([):])/g;

export const obfuscate = ({buildFolder, filename, content, excludeName, hashLength}: ObfuscateParameters): string => {
  return content.replaceAll(regex, (_, id, ending): string => {
    let hash;

    if (hashes.has(id)) {
      hash = hashes.get(id);
    } else {
      hash = Math.random().toString(16).slice(2, hashLength + 2);
      hashes.set(id, hash)
    }

    return excludeName ? `--prf-${hash}${ending}` : `${id}-${hash}${ending}`;;
  })
}
