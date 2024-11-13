import { Cards, CardType } from './card-type';

export type Player = {
  id: string;
  name: string;
  netWorth: number;
  currentBid: number;
  hand?: CardType[]; // Will store player's cards
  hasFolded: boolean;
};

export class PokerRound {
  constructor(private readonly players: Player[]) {}

  private blind = { small: 10, big: 20 };

  private currentMinimalBid = this.blind.big;

  // index of player
  private currentDealer: number;

  dealCards(){

  }
}

export class PokerGame {
  private players: Player[] = [];
  private tableCards: CardType[] = []; // Cards on the table (flop, turn, river)
  private deck: CardType[] = []; // Will contain the deck of cards
  private roundActive: boolean = false;

  constructor(players: { id: string; name: string; netWorth: number }[]) {
    this.players = players.map((player) => ({
      ...player,
      hand: [],
      currentBid: 0,
      hasFolded: false,
    }));
    this.initializeDeck();
  }

  private initializeDeck() {
    this.deck = Object.keys(Cards) as CardType[];
    this.shuffleDeck();
  }

  private shuffleDeck() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  startRound() {
    // if (this.roundActive) throw new Error('Round already active');
    this.roundActive = true;
    this.tableCards = [];
    this.players.forEach((player) => {
      player.hand = [this.deck.pop()!, this.deck.pop()!]; // Deal two cards to each player
      player.hasFolded = false;
    });
  }

  revealFlop() {
    if (!this.roundActive) throw new Error('No active round');
    this.tableCards.push(this.deck.pop()!, this.deck.pop()!, this.deck.pop()!); // Deal three cards
  }

  revealTurnOrRiver() {
    if (!this.roundActive || this.tableCards.length >= 5)
      throw new Error('Invalid action');
    this.tableCards.push(this.deck.pop()!);
  }

  playerAction(playerId: string, action: 'fold' | 'call' | 'raise') {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) throw new Error('Player not found');
    if (action === 'fold') player.hasFolded = true;
    // Additional logic for 'call' and 'raise' actions can be implemented here
  }

  endRound() {
    this.roundActive = false;
    this.players.forEach((player) => (player.hand = []));
    this.tableCards = [];
    this.initializeDeck(); // Reshuffle deck for the next round
  }

  getGameState() {
    return {
      players: this.players,
      tableCards: this.tableCards,
      roundActive: this.roundActive,
    };
  }
}
