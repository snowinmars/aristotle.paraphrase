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
    {"id": toId("body-bg"), "value": "#dbd0b1" },
    {"id": toId("body-color"), "value": "#003149" },
    {"id": toId("body-bg-hover"), "value": "#A06705" },
    {"id": toId("body-color-hover"), "value": "#feeeed" },
    {"id": toId("active-bg"), "value": "#A06705" },
    {"id": toId("active-color"), "value": "#feeeed" },
    {"id": toId("active-bg-hover"), "value": "#f5e8c7" },
    {"id": toId("active-color-hover"), "value": "#003149" },
    {"id": toId("card-bg"), "value": "#dbd0b1" },
    {"id": toId("card-color"), "value": "#003149" },
    {"id": toId("link-color"), "value": "#A06705" },
    {"id": toId("link-hover-color"), "value": "#C37854" },
    {"id": toId("border"), "value": "#00000020" },
    {"id": toId("selection"), "value": "#4D5269" }
  ]
}, {
  id: 'dark',
  colors: [
    {"id": toId("body-bg"), "value": "#343434" },
    {"id": toId("body-color"), "value": "#feeeed" },
    {"id": toId("body-bg-hover"), "value": "#595045" },
    {"id": toId("body-color-hover"), "value": "#feeeed" },
    {"id": toId("active-bg"), "value": "#595045" },
    {"id": toId("active-color"), "value": "#feeeed" },
    {"id": toId("active-bg-hover"), "value": "#543F32" },
    {"id": toId("active-color-hover"), "value": "#feeeed" },
    {"id": toId("card-bg"), "value": "#343434" },
    {"id": toId("card-color"), "value": "#feeeed" },
    {"id": toId("link-color"), "value": "#B3424A" },
    {"id": toId("link-hover-color"), "value": "#C22047" },
    {"id": toId("border"), "value": "#BBBCBF20" },
    {"id": toId("selection"), "value": "#FF5234" }
  ]
}, {
  id: 'blue',
  colors: [
    {id: toId('active-bg'), value: '#83CCD2'},
    {id: toId('active-bg-hover'), value: '#5BAD92'},
    {id: toId('active-color'), value: '#250d00'},
    {id: toId('active-color-hover'), value: '#250d00'},
    {id: toId('body-bg'), value: '#165E83'},
    {id: toId('body-bg-hover'), value: '#83CCD2'},
    {id: toId('body-color'), value: '#feeeed'},
    {id: toId('body-color-hover'), value: '#250d00'},
    {id: toId('border'), value: '#00000020'},
    {id: toId('card-bg'), value: '#165E83'},
    {id: toId('card-color'), value: '#72BAA7'},
    {id: toId('link-color'), value: '#FFD400'},
    {id: toId('link-hover-color'), value: '#FFB74C'},
    {id: toId('selection'), value: '#72BAA7'},
  ]
}];

export const colors: Color[] = [
  { id: toId('body-bg'), name: 'Главный - фон' },
  { id: toId('body-color'), name: 'Главный - текст' },
  { id: toId('body-bg-hover'), name: 'Главный - фон - ховер' },
  { id: toId('body-color-hover'), name: 'Главный - текст - ховер' },
  { id: toId('active-bg'), name: 'Активный - фон' },
  { id: toId('active-color'), name: 'Активный - текст' },
  { id: toId('active-bg-hover'), name: 'Активный - фон - ховер' },
  { id: toId('active-color-hover'), name: 'Активный - текст - ховер' },
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
export const exportTheme = (): string => {
  const style = window.getComputedStyle(document.body);

  return JSON.stringify(
    colors.map(color => {
      return {
        id: color.id,
        value: style.getPropertyValue(color.id)
      }
    })
  )
}

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
