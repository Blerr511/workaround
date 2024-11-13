const calculatePlayerPositions = ({
  tableHeight,
  tableWidth,
}: {
  tableWidth: number;
  tableHeight: number;
}) => {
  const playerPositions = [];
  const horizontalRadius = tableWidth / 2;
  const verticalRadius = tableHeight / 2;

  const centerY = tableHeight / 2;

  const centerX = tableWidth / 2;

  // Calculate positions
  for (let i = 0; i < 10; i++) {
    const angle = i * 36 * (Math.PI / 180); // Convert degrees to radians
    const x = centerX + horizontalRadius * Math.cos(angle);
    const y = centerY + verticalRadius * Math.sin(angle);
    playerPositions.push({ x, y });
  }

  return playerPositions;
};

const percentageOf = (value: number, percentage: number) =>
  (value / 100) * percentage;

export const SIZING = {
  stage: {
    w: 12,
    h: 8,
  },
  table: {
    w: 8,
    h: 4,
  },
  card: {
    big: {
      w: 0.8,
      h: percentageOf(0.8, 140),
      m: percentageOf(0.8, 15),
    },
    medium: {
      w: 0.8,
      h: percentageOf(0.8, 140),
      m: percentageOf(0.8, 15),
    },
    small: {
      w: 0.4,
      h: percentageOf(0.4, 140),
      m: percentageOf(0.4, 15),
    },
  },
  playerPositions: {
    '10x10': calculatePlayerPositions({
      tableHeight: 5,
      tableWidth: 9,
    }),
  },
} as const;
