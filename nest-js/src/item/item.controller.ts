import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { UserService } from '../user/user.service';
import { Item } from './item.entity';

@Controller('api/items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  // Lấy toàn bộ item của 1 user
  @Get('user/:username')
  async getItemsByUser(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
    }
    return await this.itemService.getItemsByUser(user);
  }

  // Thêm item cho user
  @Post('add/:username')
  async addItem(@Param('username') username: string, @Body() item: Item) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
    }
    item.user = user;
    return await this.itemService.saveItem(item);
  }

  // Cập nhật item
  @Put(':id')
  async updateItem(@Param('id') id: number, @Body() itemUpdate: Item) {
    const item = await this.itemService.getItem(id);
    if (!item) {
      throw new HttpException('Item không tồn tại!', HttpStatus.NOT_FOUND);
    }

    item.ten = itemUpdate.ten;
    item.loai = itemUpdate.loai;
    item.moTa = itemUpdate.moTa;
    item.soLuong = itemUpdate.soLuong;
    item.viTri = itemUpdate.viTri;
    item.chiso = itemUpdate.chiso;

    return await this.itemService.saveItem(item);
  }

  // Xóa item
  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    await this.itemService.deleteItem(id);
    return { message: 'Xóa item thành công!' };
  }

  // Thêm nhiều item (replace toàn bộ list)
  @Post('add-multiple/:username')
  async addItems(@Param('username') username: string, @Body() items: Item[]) {
    try {
      const user = await this.userService.findByUsername(username);
      if (!user) {
        throw new HttpException('User không tồn tại!', HttpStatus.BAD_REQUEST);
      }

      // Xóa item cũ
      await this.itemService.deleteByUser(user);

      // Gán user cho từng item mới
      items.forEach((item) => {
        item.user = user;
      });

      return await this.itemService.saveAll(items);
    } catch (e) {
      throw new HttpException(
        `Lỗi khi lưu item: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}