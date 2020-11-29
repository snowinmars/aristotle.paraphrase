const isValidState = <T>(str: string)=> {
  return Object.keys(typeof(T)).some(state => T[state] === str);
}

const toState = (str: string) => {
  return isValidState(str) ? str : State.Running;
}

export default toState;
