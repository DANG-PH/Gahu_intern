import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',   // 👈 lấy từ env
      port: parseInt(process.env.DB_PORT ?? '3307', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'Phamhaidang112@',
      database: process.env.DB_NAME || 'gahu_intern',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ItemModule,
  ],
})
export class AppModule {}

// Method	    Chức năng	      Scope
// forRoot()	
// Kết nối DB toàn cục	       
// AppModule (1 lần)

// forFeature([Entity])
// Đăng ký repository của entity cho module con	
// Module con, để inject @InjectRepository(Entity)

// TypeOrmModule.forRoot() không phải chỉ “import module” bình thường.

// Nó thiết lập kết nối tới database toàn cục.

// Mỗi module con (UserModule, AuthModule…) sẽ dùng kết nối này khi bạn forFeature([Entity]).


// Flow:

// AppModule → forRoot() tạo DB connection.

// UserModule → forFeature([User]) tạo repository User.

// UserService → @InjectRepository(User) nhận repository để thao tác DB.

// UserController → gọi service, trả dữ liệu cho client.