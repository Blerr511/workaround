import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient, PrismaModule } from '@wr/data-source';
import { MyUserModule } from './my-user/my-user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { AppUser } from './auth/entities';

const internalModules = [MyUserModule];

@Module({
  imports: [
    PrismaModule.forRootAsync(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: (...args) => {
        const appUser = new AppUser('aaa', 'bbb');
        return { appUser };
      },
    }),
    ...internalModules,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly prismaClient: PrismaClient) {}
  async onApplicationBootstrap() {
    await this.prismaClient.$connect();
  }
}
