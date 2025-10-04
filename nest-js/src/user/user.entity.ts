import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Item } from '../item/item.entity';
import { DeTu } from '../detu/detu.entity';

@Entity('users') // ánh xạ table users
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ default: false })
  biBan: boolean;

  @Column({ default: 'USER' })
  role: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'bigint', default: 0 })
  vang: number;

  @Column({ type: 'bigint', default: 0 })
  ngoc: number;

  @Column({ type: 'bigint', default: 0 })
  sucManh: number;

  @Column({ type: 'bigint', default: 0 })
  vangNapTuWeb: number;

  @Column({ type: 'bigint', default: 0 })
  ngocNapTuWeb: number;

  @Column({ type: 'float', default: 100 })
  x: number;

  @Column({ type: 'float', default: 175 })
  y: number;

  @Column({ default: 'Nhà Gôhan' })
  mapHienTai: string;

  @Column({ default: false })
  daVaoTaiKhoanLanDau: boolean;

  @Column({ default: false })
  coDeTu: boolean;

  @Column('simple-array', { nullable: true })
  danhSachVatPhamWeb: number[];

  // Quan hệ 1 User nhiều Item
  @OneToMany(() => Item, item => item.user, { cascade: true, eager: true })
  items: Item[];

  // Quan hệ 1 User 1 DeTu
  @OneToOne(() => DeTu, detu => detu.user, { cascade: true, eager: true })
  deTu: DeTu;
}

// 1. cascade: true

// Nghĩa là khi bạn lưu, update hoặc xóa entity cha, thì entity con liên quan cũng được tự động lưu/đồng bộ.

// Ví dụ:

// const user = new User();
// user.username = 'dang';

// // Tạo luôn DeTu gắn kèm
// const detu = new DeTu();
// detu.sucManh = 5000;
// user.deTu = detu;

// // Chỉ cần save user
// await userRepo.save(user);

// 2. eager: true

// Nghĩa là khi bạn query User, thì quan hệ này (DeTu) sẽ được tự động join và load luôn, không cần gọi .find({ relations: ['deTu'] }).

// Ví dụ:

// const user = await userRepo.findOne({ where: { id: 1 } });
// console.log(user.deTu); // Có dữ liệu luôn nếu eager: true


// Nếu không có eager, thì mặc định chỉ load dữ liệu User, còn deTu phải gọi thêm relations.