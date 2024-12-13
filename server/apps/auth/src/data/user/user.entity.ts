import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthProvider } from '../auth-provider/auth-provider.entity';

@Entity()
export class WrUser {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => AuthProvider, (provider) => provider.user, { cascade: true })
  providers: AuthProvider[];
}
