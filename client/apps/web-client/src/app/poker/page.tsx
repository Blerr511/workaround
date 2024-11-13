'use client';

import dynamic from 'next/dynamic';

import { NextPage } from 'next';

const GameBoard = dynamic(
  () => import('@wr/ui').then((module) => module.GameBoard),
  { ssr: false }
);

const PokerPage: NextPage = () => {
  return <GameBoard />;
};

export default PokerPage;
