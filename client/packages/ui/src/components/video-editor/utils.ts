const DEFAULT_WIDTH = 500;

export const getWidth = (
  time: number,
  totalDuration: number,
  zoom = 1
): number => {
  return (time / totalDuration) * DEFAULT_WIDTH * zoom;
};
