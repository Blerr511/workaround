'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Text, Rect, Group, Circle } from 'react-konva';
import { PokerGame } from './poker.game';
import { PlayingCard } from './playing-card';
import { PokerCommunity } from './poker-community';
import { PokerPlayer } from './poker-player';
import { useSize } from './use-size';
import { SIZING } from './sizings';

type PlayerProps = {
  id: string;
  name: string;
  netWorth: number;
  hand: string[];
  hasFolded: boolean;
};

// Initialize the PokerGame instance
const initialPlayers = [
  { id: '1', name: 'Player 1', netWorth: 1000 },
  { id: '2', name: 'Player 2', netWorth: 1000 },
  { id: '2', name: 'Player 3', netWorth: 1000 },
  { id: '2', name: 'Player 4', netWorth: 1000 },
  { id: '2', name: 'Player 5', netWorth: 1000 },
  { id: '2', name: 'Player 6', netWorth: 1000 },
  { id: '2', name: 'Player 7', netWorth: 1000 },
  { id: '2', name: 'Player 8', netWorth: 1000 },
  { id: '2', name: 'Player 9', netWorth: 1000 },
  { id: '2', name: 'Player 10', netWorth: 1000 },
  // Add more players as needed
];
const pokerGame = new PokerGame(initialPlayers);
pokerGame.startRound();
pokerGame.revealFlop();
pokerGame.revealTurnOrRiver();
pokerGame.revealTurnOrRiver();

export const GameBoard: React.FC = () => {
  const size = useSize();

  return (
    <Stage width={size(SIZING.stage.w)} height={size(SIZING.stage.h)}>
      <Layer>
        <Group x={size(2)} y={size(2)}>
          <Rect
            cornerRadius={size(SIZING.table.h)}
            fill="#31486A"
            stroke="#365075"
            strokeWidth={30}
            width={size(SIZING.table.w)}
            height={size(SIZING.table.h)}
          />

          <PokerCommunity
            cards={pokerGame
              .getGameState()
              .tableCards.concat(
                new Array(5 - pokerGame.getGameState().tableCards.length).fill(
                  '1B'
                )
              )}
            x={
              size(SIZING.table.w) / 2 -
              (size(SIZING.card.medium.w) + size(SIZING.card.medium.m)) * 2.5
            }
            y={(size(SIZING.table.h) - size(SIZING.card.medium.h)) / 3}
          />

          {pokerGame.getGameState().players.map((player, index) => (
            <PokerPlayer
              key={player.id}
              player={
                player.id === '3' ? player : { ...player, hand: undefined }
              }
              positionIndex={index}
            />
          ))}

          <Group x={400} y={300}>
            <Circle radius={20} fill="#E3B33D" />
            <Text
              text={`$${10000}`}
              fontSize={12}
              fill="white"
              align="center"
            />
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
};
