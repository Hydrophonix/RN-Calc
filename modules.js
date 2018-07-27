const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';

export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const enter = () => ({
  type: ENTER,
});

const initState = {
  stack: [],
  inputState: 'replace',
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack],
        inputState: 'replace',
      };
    case PRESS_NUM:
      if (state.inputState === 'append') {
        return {
          stack: [(state.stack[0] || '0') + payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      } if (state.inputState === 'replace') {
        return {
          stack: [payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      }
      break;
    default:
      return state;
  }
};
