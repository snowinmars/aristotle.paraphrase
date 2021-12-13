import {Color, colors} from "../../../utils/color-settings";

type Theme = {
  id: string;
  colors: ThemeColor[];
}

type ThemeColor = {
  id: string;
  value: string;
}

// populate this collection using 'export' button from ui
const themes: Theme[] = [{
  id: 'light',
  colors: [{"id":"--bs-body-bg","value":"#dbd0b1"},{"id":"--bs-body-bg-hover","value":"#A06705"},{"id":"--bs-body-color","value":"#003149"},{"id":"--bs-body-color-hover","value":"#4D5269"},{"id":"--bs-active-bg","value":"#A06705"},{"id":"--bs-active-bg-hover","value":"#f5e8c7"},{"id":"--bs-active-color","value":"#dbd0b1"},{"id":"--bs-active-color-hover","value":"#003149"},{"id":"--bs-card-bg","value":"#dbd0b1"},{"id":"--bs-card-color","value":"#003149"},{"id":"--bs-link-color","value":"#A06705"},{"id":"--bs-link-hover-color","value":"#C37854"},{"id":"--bs-border","value":"#00000020"},{"id":"--bs-selection","value":"#4D5269"}]
}, {
  id: 'dark',
  colors: [{"id":"--bs-body-bg","value":"#343434"},{"id":"--bs-body-bg-hover","value":"#595045"},{"id":"--bs-body-color","value":"#feeeed"},{"id":"--bs-body-color-hover","value":"#FF5234"},{"id":"--bs-active-bg","value":"#595045"},{"id":"--bs-active-bg-hover","value":"#543F32"},{"id":"--bs-active-color","value":"#FF5234"},{"id":"--bs-active-color-hover","value":"#FF5234"},{"id":"--bs-card-bg","value":"#343434"},{"id":"--bs-card-color","value":"#feeeed"},{"id":"--bs-link-color","value":"#B3424A"},{"id":"--bs-link-hover-color","value":"#C22047"},{"id":"--bs-border","value":"#BBBCBF20"},{"id":"--bs-selection","value":"#FF5234"}]
}, {
  id: 'blue',
  colors: [{"id":"--bs-body-bg","value":"#165E83"},{"id":"--bs-body-bg-hover","value":"#83CCD2"},{"id":"--bs-body-color","value":"#feeeed"},{"id":"--bs-body-color-hover","value":"#250d00"},{"id":"--bs-active-bg","value":"#83CCD2"},{"id":"--bs-active-bg-hover","value":"#5BAD92"},{"id":"--bs-active-color","value":"#250d00"},{"id":"--bs-active-color-hover","value":"#250d00"},{"id":"--bs-card-bg","value":"#165E83"},{"id":"--bs-card-color","value":"#72BAA7"},{"id":"--bs-link-color","value":"#FFD400"},{"id":"--bs-link-hover-color","value":"#FFB74C"},{"id":"--bs-border","value":"#00000020"},{"id":"--bs-selection","value":"#72BAA7"}]
}];

export const getTheme = (id: string): ThemeColor[] => {
  return themes.filter(x => x.id === id)[0].colors;
};

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
