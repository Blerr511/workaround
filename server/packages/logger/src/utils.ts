const red = (text: string | number | boolean) => `\x1b[31m${text}\x1b[0m`;
const green = (text: string | number | boolean) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text: string | number | boolean) => `\x1b[33m${text}\x1b[0m`;
const blue = (text: string | number | boolean) => `\x1b[34m${text}\x1b[0m`;
const underscore = (text: string | number | boolean) => `\x1b[4m${text}\x1b[0m`;

export const colors = {
  red,
  green,
  yellow,
  blue,
  underscore,
};

export const deserializeError = <E extends Error>(error: E) => {
  return {
    ...error,
    message: error.message,
    name: error.message,
    stack: error.stack,
  };
};
