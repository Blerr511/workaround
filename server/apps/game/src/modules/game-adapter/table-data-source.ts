import { PrismaClient } from '@wr/game-data-source';
import { ITableDataSource, ITableModel, SeatModel } from '../../app/game/table';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TablePrismaDataSource implements ITableDataSource {
  constructor(private readonly prismaClient: PrismaClient) {}

  async updateTable(
    id: string,
    data: Omit<ITableModel, 'seats' | 'id'>,
  ): Promise<void> {
    await this.prismaClient.table.update({ where: { id }, data });
  }

  async createSeat(tableId: string, data: SeatModel): Promise<void> {
    await this.prismaClient.seat.create({
      data: {
        id: data.id,
        position: data.position,
        chips: data.chips,
        userId: data.player.id,
        tableId,
      },
    });
  }

  async deleteSeat(tableId: string, seatId: SeatModel['id']): Promise<void> {
    await this.prismaClient.seat.delete({
      where: {
        tableId,
        id: seatId,
      },
    });
  }
}
