const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = 'CLEAR';
const SWAP = 'SWAP';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';

export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const enter = () => ({
  type: ENTER,
});

export const operation = op => ({
  type: OPERATION,
  payload: op,
});

export const clear = () => ({
  type: CLEAR,
});

export const swap = () => ({
  type: SWAP,
});

export const toggleNegative = idx => ({
  type: TOGGLE_NEGATIVE,
  payload: idx,
});

const initState = {
  stack: [],
  inputState: 'replace',
};

const doOperation = (x, y, op) => {
  switch (op) {
    case 'pow':
      return y ** x;

    case '+':
      return y + x;

    case '-':
      return y - x;

    case 'X':
      return y * x;

    case '/':
      return y / x;

    default:
      return 0;
  }
};

const switchNegative = (x) => {
  if (x.startsWith('-')) {
    return x.slice(1);
  }
  return `-${x}`;
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case TOGGLE_NEGATIVE:
      return {
        stack: state.stack.map((x, i) => (payload === i ? switchNegative(x) : x)),
        inputState: state.inputState,
      };

    case SWAP:
      return {
        stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
        inputState: 'push',
      };

    case CLEAR:
      return initState;

    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack],
        inputState: 'replace',
      };

    case OPERATION:
      return {
        stack: [`${doOperation(
          parseFloat(state.stack[0]),
          parseFloat(state.stack[1]),
          payload,
        )}`,
        ...state.stack.slice(2)],
        inputState: 'push',
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
      } if (state.inputState === 'push') {
        return {
          stack: [payload, ...state.stack],
          inputState: 'append',
        };
      }
      break;
    default:
      return state;
  }
};
