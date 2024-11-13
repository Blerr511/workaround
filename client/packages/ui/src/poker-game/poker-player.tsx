import React from 'react';
import { Circle, Group, Rect, Text } from 'react-konva';
import { Player } from './poker.game';
import { CardType } from './card-type';
import { PlayingCard } from './playing-card';
import { useSize } from './use-size';
import { SIZING } from './sizings';

export interface PokerPlayerProps {
  player: Player;
  positionIndex: number;
}

export const PokerPlayer = ({ player, positionIndex }: PokerPlayerProps) => {
  const size = useSize();

  const x =
    size(SIZING.playerPositions['10x10'][positionIndex].x) -
    (size(SIZING.card.small.w) + size(SIZING.card.small.m)) * 2;

  const y =
    size(SIZING.playerPositions['10x10'][positionIndex].y) -
    size(SIZING.card.small.h) * 1.4;
  return (
    <Group x={x} y={y}>
      {/* Player Cards */}
      {player.hand ? (
        <PokerCurrentPlayerCard
          cards={player.hand}
          hasFolded={player.hasFolded}
        />
      ) : (
        <PokerOpponentCard hasFolded={player.hasFolded} />
      )}
    </Group>
  );
};

export interface PokerCurrentPlayerCardProps {
  cards: CardType[];
  hasFolded: boolean;
}

const PokerCurrentPlayerCard = ({
  cards,
  hasFolded,
}: PokerCurrentPlayerCardProps) => (
  <Group>
    {cards.map((card, index) => (
      <PlayingCard
        key={index}
        cardIndex={index}
        type={card}
        hasFolded={hasFolded}
        cardSize="small"
      />
    ))}
    {!hasFolded && (
      <Rect
        x={0}
        y={80}
        width={120}
        height={80}
        stroke="gray"
        dash={[10, 5]}
        cornerRadius={5}
      />
    )}
  </Group>
);

export interface PokerOpponentCardProps {
  hasFolded: boolean;
}

const PokerOpponentCard = ({ hasFolded }: PokerOpponentCardProps) => (
  <Group>
    {!hasFolded &&
      [1, 2].map((_, index) => (
        <PlayingCard
          key={index}
          cardIndex={index}
          type={'1B'}
          hasFolded={hasFolded}
          cardSize="small"
          withBorder
        />
      ))}
  </Group>
);
