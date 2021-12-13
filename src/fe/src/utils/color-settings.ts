export const getColorValue = (id: string): string => window.getComputedStyle(document.body).getPropertyValue(id);
export const setColorValue = (id: string, value: string): void => document.body.style.setProperty(id, value);

export type Color = {
  id: string;
  name: string;
}

// todo [snow]: entype and color settings helper too
// todo [snow]: order?
export const colors: Color[] = [
  { id: '--bs-body-bg', name: 'Главный - фон' },
  { id: '--bs-body-bg-hover', name: 'Главный - фон - ховер' },
  { id: '--bs-body-color', name: 'Главный - текст' },
  { id: '--bs-body-color-hover', name: 'Главный - текст - ховер' },
  { id: '--bs-active-bg', name: 'Активный - фон' },
  { id: '--bs-active-bg-hover', name: 'Активный - фон - ховер' },
  { id: '--bs-active-color', name: 'Активный - текст' },
  { id: '--bs-active-color-hover', name: 'Активный - текст - ховер' },
  { id: '--bs-card-bg', name: 'Карточка - фон' },
  { id: '--bs-card-color', name: 'Карточка - текст' },
  { id: '--bs-link-color', name: 'Ссылка - текст' },
  { id: '--bs-link-hover-color', name: 'Ссылка - текст - ховер' },
  { id: '--bs-border', name: 'Границы' },
  { id: '--bs-selection', name: 'Дополнительный' },
];

export const saveColorTheme = (colors: Color[]): void => {
  colors.forEach(color => {
    localStorage.setItem(color.id, getColorValue(color.id));
  });
};

export const loadColorTheme = (colors: Color[]): void => {
  colors.forEach(color => {
    const cachedColorValue = localStorage.getItem(color.id);

    if (cachedColorValue) {
      setColorValue(color.id, cachedColorValue);
    }
  });
};
