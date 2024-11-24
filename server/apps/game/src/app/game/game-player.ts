import { Card } from './card';

export class GamePlayer {
  id: string;

  hand: Card[];

  constructor(data: GamePlayer) {
    Object.assign(this, data);
  }
}
