import {
  Module,
  OnApplicationBootstrap,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';

import { MODULE_CONFIG, MODULE_GRAPHQL, MODULE_PRISMA } from './modules';

import { PrismaClient } from '@wr/game-data-source';
import { AppResolver } from './app.resolver';
import { GameEnterPrismaAdapter } from './game-adapter/game-enter-adapter';
import { GameAsyncStorageService } from './game-async-storage/game-async-storage.service';
import { GamePlayer } from '../app/game/game-player';
import { Card } from '../app/game/card';
import { GameAsyncStorageModule } from './game-async-storage';
import { GameAdapterModule } from './game-adapter/game-adapter.module';
import { GraphqlPubsubModule } from '../app/graphql-pubsub';

@Module({
  imports: [
    MODULE_CONFIG,
    MODULE_PRISMA,
    MODULE_GRAPHQL,
    GraphqlPubsubModule,
    GameAsyncStorageModule,
    GameAdapterModule,
  ],
  providers: [AppResolver],
  exports: [],
})
export class AppModule implements OnApplicationBootstrap, NestModule {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly gameAsyncStorageService: GameAsyncStorageService,
    private readonly adapter: GameEnterPrismaAdapter,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const [userId, tableId] = [
          req.headers['x-user-id'],
          req.headers['x-table-id'],
        ];

        const fetchModels = async () => {
          let callee = await this.prismaClient.user.findFirst({
            where: { id: userId },
            include: { cards: {} },
          });

          if (!callee) {
            await this.prismaClient.user.create({
              data: {
                id: userId,
                balance: 0,
              },
            });

            callee = await this.prismaClient.user.findFirst({
              where: { id: userId },
              include: { cards: {} },
            });
          }
          console.log('callee', callee, userId);
          const tableModel = await this.adapter.make(tableId);
          const calleeModel = new GamePlayer({
            id: callee.id,
            hand: callee.cards.map((card) => new Card(card.rank, card.suit)),
          });

          return { tableModel, calleeModel };
        };

        fetchModels().then(
          ({ calleeModel, tableModel }) => {
            req['__state'] = {
              game: tableModel,
              callee: calleeModel,
            };

            this.gameAsyncStorageService.asyncLocalStorage.run(
              { callee: calleeModel, game: tableModel },
              () => next(),
            );
          },
          (err) => next(err),
        );
      })
      .forRoutes('*');
  }

  async onApplicationBootstrap() {
    await this.prismaClient.$connect();

    const existsTable = await this.prismaClient.table.findFirst({
      where: {
        id: '1111-1111-1111-1111',
      },
    });

    if (!existsTable) {
      console.log('no table, creating ');
      await this.prismaClient.table.create({
        data: {
          id: '1111-1111-1111-1111',
          bigBlind: 200,
          smallBlind: 100,
          maxPlayers: 10,
          name: 'test1',
        },
      });
    }
  }
}
