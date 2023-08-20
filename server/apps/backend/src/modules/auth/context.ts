export interface IUserProvider {
  id: number;
  name: string;
  providerId: string;
  identifier: string;
}

export class GraphqlContext {
  user: {
    uid: string;
    providers: IUserProvider[];
  };
}
