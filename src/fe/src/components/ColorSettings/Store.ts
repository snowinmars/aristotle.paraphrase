const getCssValue = (key: string): string => {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--${key}`);
};

const setCssValue = (key: string, value: string) => {
  document
    .documentElement.style.setProperty(`--${key}`, value);
};

export default {
  getCssValue,
  setCssValue,
};
