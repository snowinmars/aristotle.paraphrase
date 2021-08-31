export type Color = {
  id: string;
  name: string;
}

type Theme = {
  id: string;
  colors: ThemeColor[];
}

type ThemeColor = {
  id: string;
  value: string;
}

const toId = (x: string): string => `--bs-${x}`;

const themes: Theme[] = [{
  id: 'light',
  colors: [
    { id: toId('body-bg'), value: '#f5e8c7' },
    { id: toId('body-color'), value: '#6f4c4d' },
    { id: toId('body-bg-hover'), value: '#dbd0b2' },
    { id: toId('body-color-hover'), value: '#a34040' },
    { id: toId('component-active-bg'), value: '#dbd0b2' },
    { id: toId('component-active-color'), value: '#925759' },
    { id: toId('component-active-bg-hover'), value: '#f5e8c7' },
    { id: toId('component-active-color-hover'), value: '#b1bbc4' },
    { id: toId('card-bg'), value: '#dbd0b1' },
    { id: toId('card-color'), value: '#925759' },
    { id: toId('link-color'), value: '#9e7777' },
    { id: toId('link-hover-color'), value: '#b88a8a' },
    { id: toId('border'), value: '#deba9d' },
    { id: toId('selection'), value: '#bd4a4a' },
  ]
}, {
  id: 'dark',
  colors: [
    {id: toId('border'), value: '#00000020'},
    {id: toId('selection'), value: '#fd7e14'},
    {id: toId('body-bg'), value: '#495057'},
    {id: toId('body-color'), value: '#adb5bd'},
    {id: toId('body-bg-hover'), value: '#606a73'},
    {id: toId('body-color-hover'), value: '#c9cfd4'},
    {id: toId('component-active-bg'), value: '#52585a'},
    {id: toId('component-active-color'), value: '#ced4da'},
    {id: toId('component-active-bg-hover'), value: '#6a7275'},
    {id: toId('component-active-color-hover'), value: '#b1bbc4'},
    {id: toId('card-bg'), value: '#52585a'},
    {id: toId('card-color'), value: '#ced4da'},
    {id: toId('link-color'), value: '#9eeaf9'},
    {id: toId('link-hover-color'), value: '#0aa2c0'},
  ]
}];

export const colors: Color[] = [
  { id: toId('body-bg'), name: 'Главный - фон' },
  { id: toId('body-color'), name: 'Главный - текст' },
  { id: toId('body-bg-hover'), name: 'Главный - фон - ховер' },
  { id: toId('body-color-hover'), name: 'Главный - текст - ховер' },
  { id: toId('component-active-bg'), name: 'Активный - фон' },
  { id: toId('component-active-color'), name: 'Активный - текст' },
  { id: toId('component-active-bg-hover'), name: 'Активный - фон - ховер' },
  { id: toId('component-active-color-hover'), name: 'Активный - текст - ховер' },
  { id: toId('card-bg'), name: 'Карточка - фон' },
  { id: toId('card-color'), name: 'Карточка - текст' },
  { id: toId('link-color'), name: 'Ссылка - текст' },
  { id: toId('link-hover-color'), name: 'Ссылка - текст - ховер' },
  { id: toId('border'), name: 'Границы' },
  { id: toId('selection'), name: 'Дополнительный' },
];

export const getTheme = (id: string): ThemeColor[] => {
  return themes.filter(x => x.id === id)[0].colors;
};

export const getColorValue = (id: string): string => window.getComputedStyle(document.body).getPropertyValue(id);
export const setColorValue = (id: string, value: string): void => document.body.style.setProperty(id, value);

export const saveColorTheme = (): void => {
  colors.forEach(color => {
    localStorage.setItem(color.id, getColorValue(color.id));
  });
};

export const loadColorTheme = (): void => {
  colors.forEach(color => {
    const cachedColorValue = localStorage.getItem(color.id);

    if (cachedColorValue) {
      setColorValue(color.id, cachedColorValue);
    }
  });
};
