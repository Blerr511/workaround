import { GamePlayer } from '../../app/game/game-player';
import { TableModel } from '../../app/game/table';

export interface AsyncContext {
  game: TableModel;
  callee: GamePlayer;
}
