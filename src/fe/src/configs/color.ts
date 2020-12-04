interface Colors {
  default: {
    bgMaster: string,
    bgSlave: string,
    fgMaster: string,
    fgSlave: string,
  }
}

// ensure it fits colors.scss
const colors: Colors = {
  default: {
    bgMaster: '#212121',
    bgSlave: '#484848',
    fgMaster: '#bcaaa4',
    fgSlave: '#8bc34a',
  },
};

export default colors;
