import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('detu')
export class DeTu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', default: 2000 })
  sucManh: number;

  @OneToOne(() => User, user => user.deTu, { nullable: false })
  @JoinColumn({ name: 'user_id' }) // giống @JoinColumn bên Java
  user: User;
}