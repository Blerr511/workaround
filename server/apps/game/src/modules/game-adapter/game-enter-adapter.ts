import { PrismaClient, Table } from '@wr/game-data-source';
import { SeatModel, TableModel } from '../../app/game/table';
import { GamePlayer } from '../../app/game/game-player';
import { Card } from '../../app/game/card';
import { TablePrismaDataSource } from './table-data-source';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameEnterPrismaAdapter {
  constructor(
    private readonly dataSource: PrismaClient,
    private readonly tableDataSource: TablePrismaDataSource,
  ) {}

  async make(tableId: Table['id']) {
    const table = await this.dataSource.table.findFirstOrThrow({
      where: { id: tableId },
      include: {
        seats: {
          include: {
            user: {
              include: {
                cards: true,
              },
            },
          },
        },
      },
    });

    const tableGame = new TableModel(() => this.tableDataSource, {
      id: table.id,
      bigBlind: table.bigBlind,
      maxPlayers: table.maxPlayers,
      name: table.name,
      smallBlind: table.smallBlind,
      seats: table.seats.map((seat) => {
        const seatModel = new SeatModel({
          id: seat.id,
          chips: seat.chips,
          position: seat.position,
          player: new GamePlayer({
            id: seat.user.id,
            hand: seat.user.cards.map((card) => new Card(card.rank, card.suit)),
          }),
        });

        return seatModel;
      }),
    });

    return tableGame;
  }
}
