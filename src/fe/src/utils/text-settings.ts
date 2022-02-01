export type TextSettings = {
  readonly enableParaphrase: boolean;
  readonly enableQbitSky: boolean;
  readonly enableRoss: boolean;
  readonly enabledCount: number;
}

export const saveTextSettings = ({enableParaphrase, enableQbitSky, enableRoss}: Partial<TextSettings>): void => {
  localStorage.setItem('enableParaphrase', (enableParaphrase || false).toString());
  localStorage.setItem('enableQbitSky', (enableQbitSky || false).toString());
  localStorage.setItem('enableRoss', (enableRoss || false).toString());
};

export const loadTextSettings = (): TextSettings => {
  const enableParaphrase = localStorage.getItem('enableParaphrase') !== 'false';
  const enableQbitSky = localStorage.getItem('enableQbitSky') !== 'false';
  const enableRoss = localStorage.getItem('enableRoss') !== 'false';

  const enabledCount = [
    enableParaphrase,
    enableQbitSky,
    enableRoss,
  ].reduce((acc, cur) => {
    if (cur) acc++;
    return acc;
  }, 0);

  return {
    enableParaphrase,
    enableQbitSky,
    enableRoss,
    enabledCount,
  };
};
