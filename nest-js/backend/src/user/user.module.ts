import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Kết nối entity User
  providers: [UserService],                  // Service sẽ được inject
  controllers: [UserController],            // Controller xử lý API
  exports: [UserService],
})
export class UserModule {}

// imports → import module khác hoặc entity mà module này cần.

// Ví dụ: TypeOrmModule.forFeature([User]) → NestJS biết module này dùng entity User.

// [User] → danh sách entity mà module này sẽ dùng.

// NestJS sẽ tạo repository tương ứng cho entity đó, và cho phép inject vào service bằng @InjectRepository(User).

// providers → service hoặc các provider khác mà module cung cấp.

// NestJS sẽ tạo instance service này và inject vào controller hoặc service khác khi cần.

// controllers → các controller thuộc module, xử lý request API liên quan.

// Khi client gọi API, NestJS sẽ tìm controller tương ứng trong module.