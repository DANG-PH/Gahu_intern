import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Long } from 'typeorm/browser';
import { User } from '../user/user.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  maItem: string;

  @Column()
  ten: string;

  @Column()
  loai: string;

  @Column('text')
  moTa: string;

  @Column()
  soLuong: number;

  @Column()
  hanhTinh: string;

  @Column()
  setKichHoat: string;

  @Column()
  soSaoPhaLe: number;

  @Column()
  soSaoPhaLeCuongHoa: number;

  @Column()
  soCap: number;

  @Column('float')
  hanSuDung: number;

  @Column('bigint')
  sucManhYeuCau: string;

  @Column()
  linkTexture: string;

  @Column()
  viTri: string;

  @Column('json')
  chiso: any;

  @ManyToOne(() => User, user => user.items, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}