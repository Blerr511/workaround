import { CardRank, CardSuit } from '@wr/game-data-source';

export class Card {
  constructor(public readonly rank: CardRank, public readonly suid: CardSuit) {}
}
