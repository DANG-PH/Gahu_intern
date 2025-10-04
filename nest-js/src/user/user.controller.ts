import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { DeTu } from '../detu/detu.entity';

@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ========== REGISTER ==========
  @Post('register')
  async register(@Body() user: User): Promise<boolean> {
    const exists = await this.userService.existsByUsername(user.username);
    if (exists) return false;

    await this.userService.saveUser(user);
    return true;
  }

  // ========== LOGIN ==========
  @Post('login')
  async login(@Body() user: User): Promise<User> {
    const found = await this.userService.findByUsername(user.username);
    if (!found || found.password !== user.password) {
      throw new UnauthorizedException();
    }
    if (!found.daVaoTaiKhoanLanDau) {
      found.daVaoTaiKhoanLanDau = true;
      await this.userService.saveUser(found);
    }
    return found;
  }

  // ========== SAVE GAME ==========
  @Post('saveGame')
  async saveGame(@Body() user: User): Promise<string> {
    const found = await this.userService.findByUsername(user.username);
    if (!found) {
      throw new BadRequestException('User không tồn tại!');
    }

    // update từ client
    found.vang = user.vang;
    found.ngoc = user.ngoc;
    found.sucManh = user.sucManh;
    found.x = user.x;
    found.y = user.y;
    found.mapHienTai = user.mapHienTai;
    found.coDeTu = user.coDeTu && user.deTu != null;

    if (found.coDeTu) {
      if (found.deTu) {
        found.deTu.sucManh = user.deTu.sucManh;
      } else {
        const newDeTu = new DeTu();
        newDeTu.sucManh = user.deTu.sucManh;
        newDeTu.user = found;
        found.deTu = newDeTu;
      }
    }

    await this.userService.saveUser(found);
    return 'Lưu dữ liệu game thành công!';
  }

  // ========== LOAD GAME ==========
  @Get('loadGame/:username')
  async loadGame(@Param('username') username: string): Promise<User> {
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException();
    return found;
  }

  // ========== GET BALANCE ==========
  @Get('balance/:username')
  async getBalance(@Param('username') username: string) {
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException('User không tồn tại!');

    return {
      vangNapTuWeb: found.vangNapTuWeb,
      ngocNapTuWeb: found.ngocNapTuWeb,
    };
  }

  // ========== USE VÀNG NẠP ==========
  @Post('useVangNapTuWeb')
  async useVangNapTuWeb(@Body() body: { username: string; amount: number }) {
    const { username, amount } = body;
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException({ error: 'User không tồn tại!' });

    if (found.vangNapTuWeb < amount) {
      throw new BadRequestException({ error: 'Không đủ vàng nạp!' });
    }

    found.vangNapTuWeb -= amount;
    await this.userService.saveUser(found);

    return { used: amount };
  }

  // ========== USE NGỌC NẠP ==========
  @Post('useNgocNapTuWeb')
  async useNgocNapTuWeb(@Body() body: { username: string; amount: number }) {
    const { username, amount } = body;
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException({ error: 'User không tồn tại!' });

    if (found.ngocNapTuWeb < amount) {
      throw new BadRequestException({ error: 'Không đủ ngọc nạp!' });
    }

    found.ngocNapTuWeb -= amount;
    await this.userService.saveUser(found);

    return { used: amount };
  }

  // ========== UPDATE BALANCE ==========
  @Post('updateBalance')
  async updateBalance(
    @Body()
    body: { username: string; type: string; amount: number },
  ) {
    const { username, type, amount } = body;
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException({ error: 'User không tồn tại!' });

    if (type === 'vangNapTuWeb') {
      found.vangNapTuWeb = amount;
    } else if (type === 'ngocNapTuWeb') {
      found.ngocNapTuWeb = amount;
    } else {
      throw new BadRequestException({ error: 'Loại balance không hợp lệ!' });
    }

    await this.userService.saveUser(found);

    return {
      message: 'Cập nhật balance thành công!',
      vangNapTuWeb: found.vangNapTuWeb,
      ngocNapTuWeb: found.ngocNapTuWeb,
    };
  }

  // ========== ADD VÀNG NẠP ==========
  @Post('addVangNapTuWeb')
  async addVangNapTuWeb(@Body() body: { username: string; amount: number }) {
    const { username, amount } = body;
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException({ error: 'User không tồn tại!' });
    if (amount <= 0) {
      throw new BadRequestException({ error: 'Số tiền phải lớn hơn 0!' });
    }

    found.vangNapTuWeb += amount;
    await this.userService.saveUser(found);

    return {
      message: 'Nạp vàng thành công!',
      added: amount,
      totalVangNapTuWeb: found.vangNapTuWeb,
    };
  }

  // ========== ADD NGỌC NẠP ==========
  @Post('addNgocNapTuWeb')
  async addNgocNapTuWeb(@Body() body: { username: string; amount: number }) {
    const { username, amount } = body;
    const found = await this.userService.findByUsername(username);
    if (!found) throw new BadRequestException({ error: 'User không tồn tại!' });
    if (amount <= 0) {
      throw new BadRequestException({ error: 'Số tiền phải lớn hơn 0!' });
    }

    found.ngocNapTuWeb += amount;
    await this.userService.saveUser(found);

    return {
      message: 'Nạp ngọc thành công!',
      added: amount,
      totalNgocNapTuWeb: found.ngocNapTuWeb,
    };
  }

  // ========== TOP 10 ==========
  @Get('top10/sucmanh')
  async getTop10BySucManh(): Promise<User[]> {
    return this.userService.getTop10UsersBySucManh();
  }

  @Get('top10/vang')
  async getTop10ByVang(): Promise<User[]> {
    return this.userService.getTop10UsersByVang();
  }

  // ========== BAN USER ==========
  @Post('banUser')
  async banUser(@Query('username') username: string, @Query('adminName') adminName: string) {
    const admin = await this.userService.findByUsername(adminName);
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền!');
    }
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('Không tìm thấy user!');

    user.biBan = true;
    await this.userService.saveUser(user);
    return `Đã ban user ${username}`;
  }

  // ========== UPDATE ROLE ==========
  @Post('updateRole')
  async updateRole(
    @Query('username') username: string,
    @Query('newRole') newRole: string,
    @Query('adminName') adminName: string,
  ) {
    const admin = await this.userService.findByUsername(adminName);
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền đổi role!');
    }

    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('Không tìm thấy user!');

    user.role = newRole.toUpperCase();
    await this.userService.saveUser(user);

    return `Đã cập nhật role của ${username} thành ${newRole}`;
  }

  // ========== UNBAN ==========
  @Post('unbanUser')
  async unbanUser(@Query('username') username: string, @Query('adminName') adminName: string) {
    const admin = await this.userService.findByUsername(adminName);
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền!');
    }

    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('Không tìm thấy user!');

    user.biBan = false;
    await this.userService.saveUser(user);

    return `Đã unban user ${username}`;
  }

  // ========== ADD ITEM WEB ==========
  @Post('addItemWeb')
  async addItemWeb(@Query('username') username: string, @Query('itemId') itemId: number) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User không tồn tại!');

    user.danhSachVatPhamWeb.push(itemId);
    await this.userService.saveUser(user);

    return `Đã thêm item ${itemId} cho user ${username}`;
  }

  // ========== GET ITEMS WEB ==========
  @Get('getItemsWeb')
  async getItemsWeb(@Query('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User không tồn tại!');
    return user.danhSachVatPhamWeb;
  }

  // ========== USE ITEM WEB ==========
  @Post('useItemWeb')
  async useItemWeb(@Query('username') username: string, @Query('itemId') itemId: number) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User không tồn tại!');

    const idx = user.danhSachVatPhamWeb.indexOf(itemId);
    if (idx === -1) {
      throw new BadRequestException(`User không có item ${itemId}`);
    }

    user.danhSachVatPhamWeb.splice(idx, 1);
    await this.userService.saveUser(user);

    return `Đã sử dụng item ${itemId} cho user ${username}`;
  }
}