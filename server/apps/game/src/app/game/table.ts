import { SeatIsNotAvailableException } from './exceptions/seat-is-not-available.exception';
import { GamePlayer } from './game-player';
import { v4 } from 'uuid';

export interface ITableModel {
  id: string;
  name: string;
  maxPlayers: number;
  bigBlind: number;
  smallBlind: number;
  seats: ISeatModel[];
}

export interface ISeatModel {
  id: string;
  player: GamePlayer;
  position: number;
  chips: number;
}

export class SeatModel implements ISeatModel {
  id: string;
  player: GamePlayer;
  position: number;
  chips: number;

  constructor(data: ISeatModel) {
    Object.assign(this, data);
  }
}

export interface ITableDataSource {
  updateTable(
    id: string,
    data: Omit<ITableModel, 'seats' | 'id'>,
  ): Promise<void>;
  createSeat(tableId: string, data: SeatModel): Promise<void>;
  deleteSeat(tableId: string, data: SeatModel['id']): Promise<void>;
}

export class TableModel implements ITableModel {
  id: string;
  name: string;
  maxPlayers: number;
  bigBlind: number;
  smallBlind: number;
  seats: ISeatModel[];

  get allPositions() {
    return new Array(this.maxPlayers).fill(0).map((_, i) => i);
  }

  constructor(
    private readonly getDataSource: () => ITableDataSource,
    data: ITableModel,
  ) {
    Object.assign(this, { ...data });
  }

  get dataSource() {
    return this.getDataSource();
  }

  async joinPlayer(
    player: GamePlayer,
    { position, chips }: Pick<SeatModel, 'position' | 'chips'>,
  ) {
    const freePositions = this.allPositions.filter(
      (position) =>
        !this.seats.find((seat) => seat.position === position && !seat.player),
    );

    const isSeatFree = freePositions.includes(position);

    if (!isSeatFree) {
      throw new SeatIsNotAvailableException();
    }

    const newSeat = new SeatModel({
      id: v4(),
      player,
      position,
      chips,
    });

    this.seats.push(newSeat);

    await this.dataSource.createSeat(this.id, newSeat);
  }

  async leavePlayer(playerId: GamePlayer['id']) {
    const seatToLeave = this.seats.find((seat) => seat.player.id === playerId);

    if (!seatToLeave) {
      throw new Error('This player is not in table');
    }

    const removeIndex = this.seats.indexOf(seatToLeave, 1);

    this.seats = this.seats.splice(removeIndex);

    await this.dataSource.deleteSeat(this.id, seatToLeave.id);
  }
}
