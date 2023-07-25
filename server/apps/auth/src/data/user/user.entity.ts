import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthProvider } from '../auth-provider/auth-provider.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @OneToMany(() => AuthProvider, (provider) => provider.user, { cascade: true })
  providers: AuthProvider[];
}
