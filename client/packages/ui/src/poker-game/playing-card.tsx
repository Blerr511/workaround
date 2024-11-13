import { Group, Image, Rect } from 'react-konva';
import useImage from 'use-image';
import { CardType } from './card-type';
import { useSize } from './use-size';
import { SIZING } from './sizings';

const loadCardImage = (card: string) => {
  const [image] = useImage(`/_next/static/cards/${card}.svg`);
  return image;
};

export interface PlayingCardProps {
  cardIndex: number;
  type: CardType;
  hasFolded: boolean;
  cardSize: keyof typeof SIZING.card;
  withBorder?: boolean;
  folded?: boolean;
}

export const PlayingCard = ({
  cardIndex,
  hasFolded,
  type,
  cardSize,
  withBorder,
  folded,
}: PlayingCardProps) => {
  const size = useSize();

  return (
    <Group
      x={
        cardIndex *
        (size(SIZING.card[cardSize].m) + size(SIZING.card[cardSize].w))
      }
      y={0}
    >
      {!folded && (
        <Image
          key={cardIndex}
          width={size(SIZING.card[cardSize].w)}
          height={size(SIZING.card[cardSize].h)}
          image={loadCardImage(type)}
          opacity={hasFolded ? 0.5 : 1}
        />
      )}
      {withBorder && (
        <Rect
          x={1}
          y={1}
          width={size(SIZING.card[cardSize].w) - 2}
          height={size(SIZING.card[cardSize].h) - 2}
          stroke="lightgray"
          strokeWidth={2}
          dash={[10, 5]}
          fill="transparent"
        ></Rect>
      )}
    </Group>
  );
};
