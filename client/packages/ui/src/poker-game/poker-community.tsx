import React from 'react';
import { Group } from 'react-konva';
import { CardType } from './card-type';
import { PlayingCard } from './playing-card';

export interface PokerCommunityProps {
  cards: CardType[];
  x: number;
  y: number;
}

export const PokerCommunity = ({ cards, x, y }: PokerCommunityProps) => (
  <Group x={x} y={y}>
    {cards.map((card, index) => (
      <PlayingCard
        key={index}
        cardIndex={index}
        type={card}
        hasFolded={false}
        cardSize="medium"
        withBorder
        folded={card === '1B'}
      />
    ))}
  </Group>
);
