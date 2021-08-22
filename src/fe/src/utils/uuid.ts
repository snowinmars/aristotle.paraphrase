// https://stackoverflow.com/a/21963136
const lookupTable: string[] = [];
for (let i = 0; i < 256; i++) {
  lookupTable[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

export const getGuid = (): string => {
  /* eslint-disable no-mixed-operators */
  /* eslint-disable no-bitwise */
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  return `${lookupTable[d0 & 0xff] + lookupTable[d0 >> 8 & 0xff] + lookupTable[d0 >> 16 & 0xff] + lookupTable[d0 >> 24 & 0xff]}-${
    lookupTable[d1 & 0xff]}${lookupTable[d1 >> 8 & 0xff]}-${lookupTable[d1 >> 16 & 0x0f | 0x40]}${lookupTable[d1 >> 24 & 0xff]}-${
    lookupTable[d2 & 0x3f | 0x80]}${lookupTable[d2 >> 8 & 0xff]}-${lookupTable[d2 >> 16 & 0xff]}${lookupTable[d2 >> 24 & 0xff]
  }${lookupTable[d3 & 0xff]}${lookupTable[d3 >> 8 & 0xff]}${lookupTable[d3 >> 16 & 0xff]}${lookupTable[d3 >> 24 & 0xff]}`;
  /* eslint-enable no-bitwise */
  /* eslint-enable no-mixed-operators */
};
