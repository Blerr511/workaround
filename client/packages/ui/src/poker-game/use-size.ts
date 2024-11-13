export const useSize = (size: number = 1000) => {
  return (value: number) => {
    return (size / 10) * value;
  };
};
