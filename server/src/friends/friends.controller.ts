import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
@Controller('friends')
export class FriendsController {
  @Get('list')
  async getFriends() {}
}
