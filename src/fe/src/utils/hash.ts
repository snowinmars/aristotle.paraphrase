export const hash = (hashLength = 8): string => {
  return Math.random().toString(hashLength + 2).slice(2);
};
