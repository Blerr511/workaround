import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { WrUser } from '../user/user.entity';
import { Constraint } from '../constraint';

@Entity()
@Unique(Constraint.uniqueProviderIdentifier, ['providerId', 'identifier'])
export class AuthProvider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  providerId: string;

  @Column()
  identifier: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => WrUser, (user) => user.providers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: WrUser;
}
